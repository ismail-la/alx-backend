#!/usr/bin/python3
"""(LFU)Least Frequently Used caching module.
A class LFUCache that inherits from BaseCaching and is a caching system.
"""

from threading import RLock
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """An implementaion of LFUCache.
    it represents an object that allows storing and gets items from
    a dictionary with a LFU removal mechanism when the limit is reached.
    """
    def __init__(self):
        """
        Initializes the cache.
        """
        super().__init__()
        self.__stats = {}
        self.__rlock = RLock()

    def put(self, key, item):
        """
        Adds an item in the cache
        """
        if key is not None and item is not None:
            key_Out = self.balance_items(key)
            with self.__rlock:
                self.cache_data.update({key: item})
            if key_Out is not None:
                print('DISCARD: {}'.format(key_Out))

    def get(self, key):
        """
        Get an item by key.
        """
        with self.__rlock:
            value = self.cache_data.get(key, None)
            if key in self.__stats:
                self.__stats[key] += 1
        return value

    def balance_items(self, key_In):
        """Reorders the items.
        Removes the earliest items from the cache at the MAX size.
        """
        key_Out = None
        with self.__rlock:
            if key_In not in self.__stats:
                if len(self.cache_data) == BaseCaching.MAX_ITEMS:
                    key_Out = min(self.__stats, key=self.__stats.get)
                    self.cache_data.pop(key_Out)
                    self.__stats.pop(key_Out)
            self.__stats[key_In] = self.__stats.get(key_In, 0) + 1
        return key_Out
