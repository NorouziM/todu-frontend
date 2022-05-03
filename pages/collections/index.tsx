import { Flex, Skeleton } from '@chakra-ui/react';
// layouts
import DashboardLayout from '@layouts/DashboardLayout';
import Layout from '@layouts/Layout';
// components
import AddCollectionBtn from '@components/AddCollectionBtn';
import CollectionInfoBox from '@components/CollectionInfoBox';
// hooks
import useLocales from '@hooks/useLocales';
import { useCollections } from '@hooks/useSWRActions';
// utils
import { ICollectionData } from '@utils/interfaces';

const CollectionsPage = () => {
  const { trans } = useLocales();
  const { data: collections } = useCollections();

  return (
    <Layout>
      <DashboardLayout title={trans.collections} hasGreeting={false}>
        <Flex
          flexWrap="wrap"
          direction={'row'}
          justifyContent={{ base: 'center', md: 'start' }}
        >
          {collections ? (
            collections.data.collections.map((collection: ICollectionData) => (
              <CollectionInfoBox key={collection._id} data={collection} />
            ))
          ) : (
            <>
              {[...Array(3)].map((_, index) => (
                <Skeleton
                  key={index}
                  height="200px"
                  width="200px"
                  borderRadius={'lg'}
                  mx={2}
                  my={2}
                />
              ))}
            </>
          )}
          <AddCollectionBtn />
        </Flex>
      </DashboardLayout>
    </Layout>
  );
};

export default CollectionsPage;
