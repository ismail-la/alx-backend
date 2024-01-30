#!/usr/bin/env python3
"""Simple pagination.
"""

from typing import List, Tuple
import csv


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Get the index range from a given page and page size.
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)


class Server:
    """
    A server class that is used to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """
        Initialization of new Server instance
        """
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        A Cached dataset.
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Get a page of data.
        """
        assert type(page) == int and type(page_size) == int
        assert page > 0 and page_size > 0
        start, end = index_range(page, page_size)
        data = self.dataset()
        if start > len(data):
            return []
        return data[start:end]
