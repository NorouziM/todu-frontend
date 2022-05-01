import { Box, Stack } from '@chakra-ui/react';
import useLocales from '@hooks/useLocales';
import { LinkItemProps } from '@utils/interfaces';
import React from 'react';
import { MdCollections, MdDashboard } from 'react-icons/md';

const MobileNav = () => {
  const { trans } = useLocales();

  const LinkItems: Array<LinkItemProps> = [
    { name: trans.dashboard, icon: MdDashboard, href: `dashboard` },
    {
      name: trans.collections,
      icon: MdCollections,
      href: `collections`,
    },
  ];
  return (
    <Box position={'fixed'} bottom={0}>
      <Stack></Stack>
    </Box>
  );
};

export default MobileNav;
