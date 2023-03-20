"""Script to upload books to a vector index."""
import re
from pathlib import Path
from typing import Optional, Set

import click
from langchain.document_loaders import PagedPDFSplitter
from steamship import Steamship
from steamship.utils.url import Verb
from steamship_langchain.vectorstores import SteamshipVectorStore

# Step 1: Give your index a name
INDEX_NAME = "test-enias-2"

# Step 2: List the books or folders of books you want to add to your index
BOOKS_OR_BOOK_FOLDERS = [
    "uploads",
]


def index_document(
        document: Path,
        index: SteamshipVectorStore,
        loaded_documents: Optional[Set[str]] = None,
):
    loaded_documents = loaded_documents or set()

    if document.name in loaded_documents:
        if click.confirm(
                f'The book "{document.name}" is already indexed, do you want me to skip it?',
                default=True,
        ):
            return

    loader = PagedPDFSplitter(str(document.resolve()))
    pages = loader.load_and_split()

    index.add_texts(
        texts=[re.sub("\u0000", "", page.page_content) for page in pages],
        metadatas=[{**page.metadata, "source": document.name} for page in pages],
    )


if __name__ == "__main__":
    client = Steamship(workspace=INDEX_NAME)

    # amb = AskMyBook(client, config={"index_name": INDEX_NAME})
    #
    # documents = amb.get_indexed_documents()
    #
    # if len(documents) > 0:
    #     print(
    #         "The index already contains the following books: \n* "
    #         + "\n* ".join(documents)
    #     )
    #     if click.confirm("Do you want to reset your index?", default=True):
    #         print("Resetting your index, this will take a while ⏳")
    #         amb.reset()
    #
    # for book in BOOKS_OR_BOOK_FOLDERS:
    #     data_path = Path(book)
    #
    #     if data_path.is_dir():
    #         for child_data_path in data_path.iterdir():
    #             amb.add_document_from_path(child_data_path, child_data_path.name)
    #     else:
    #         amb.add_document_from_path(data_path, data_path.name)

    # print("Your documents are successfully added to the index")
    # print("You can query your documents on this endpoint: ")
    package_instance = client.use(
        "ask-my-book-chat-api", config={"index_name": INDEX_NAME}, version="0.2.0"
    )
    print(package_instance.invocation_url)
    print(package_instance.package_version_handle)

    docs = package_instance.invoke("documents", verb=Verb.GET)
    print(docs)
    package_instance.invoke("reset", verb=Verb.POST)
    docs = package_instance.invoke("documents", verb=Verb.GET)
    print(docs)
    package_instance.invoke("add_document", **{
        "url": "https://www.pdfdrive.com/download.pdf?id=158699038&h=27b488a11dd3efed1217baf65bf0e102&u=cache&ext=pdf",
        "name": "tester.pdf",
        "mime_type": "application/pdf"
    })
    docs = package_instance.invoke("documents", verb=Verb.GET)
    print(docs)
    response = package_instance.invoke("answer", question="What is specific knowledge?")
    print(response)
