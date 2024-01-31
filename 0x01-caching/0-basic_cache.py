#!/usr/bin/env python3
"""
Basecaching module.
A class BasicCache that inherits from BaseCaching and is a caching system.
"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """BaseCaching;
    Represents an object that allows storing and get items from a dictionary.
    """
    def put(self, key, item):
        """
        Adds an item in the cache.
        """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """
        Get an item by key.
        """
        return self.cache_data.get(key, None)
