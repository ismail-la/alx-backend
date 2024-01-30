#!/usr/bin/env python3
"""
A function named that takes two integer arguments page and page_size.
-return a tuple of size two containing a start index and an end index
corresponding to the range of indexes to return in a list for those particular
pagination parameters.
-Page numbers are 1-indexed, i.e. the first page is page 1.
"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Get the index range from a given page and page size.
    A pair of indices, namely the start index and the end index,
    that correspond to the range of indexes.
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)
