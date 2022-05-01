import React, { useState } from 'react';
// components
import CollectionBox from '@components/CollectionBox';
// hokks
import { useCollections } from '@hooks/useSWRActions';
// utils
import { ICollectionData } from '@utils/interfaces';

const InboxTodos = () => {
  const { data: collections } = useCollections();

  const [collectionIndexes, setCollectionIndexes] =
    useState<Array<number> | null>(null);

  if (collections && !collectionIndexes) {
    let indexes = [];
    indexes = collections.data.collections.map(
      (_: any, index: number) => index
    );

    setCollectionIndexes(indexes);
  }
  return (
    <>
      {collections &&
        collections.data.collections.map(
          (collection: ICollectionData, index: number) => (
            <CollectionBox
              key={collection._id}
              dateType="inbox"
              collection={collection}
              collectionIndexes={collectionIndexes}
            />
          )
        )}
    </>
  );
};

export default InboxTodos;
