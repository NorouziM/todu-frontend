import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import TodayTodos from '@components/todos/todayTodos';
import useCommonStyles from '@hooks/useCommonStyles';
import useLocales from '@hooks/useLocales';
import DashboardLayout from '@layouts/DashboardLayout';
import Layout from '@layouts/Layout';
import React from 'react';

const DashboardHome = () => {
  const { trans } = useLocales();
  const { text, boxBg, textLight } = useCommonStyles();
  const tabs = [trans.today, trans.next7Days, trans.inbox];
  return (
    <Layout>
      <DashboardLayout title={trans.dashboard}>
        <Tabs variant="soft-rounded" isLazy>
          <TabList mb={8}>
            {tabs.map((tab, index) => (
              <Tab
                key={tab}
                pt={3}
                alignItems={'center'}
                borderRadius={'xl'}
                mr={index !== tabs.length - 1 ? [3, 7, 8] : 0}
                borderColor={boxBg}
                borderWidth={1}
                fontSize={'sm'}
                w="32"
                color={textLight}
                _selected={{ bgColor: boxBg, color: text }}
              >
                {tab}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <TodayTodos />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DashboardLayout>
    </Layout>
  );
};

export default DashboardHome;
