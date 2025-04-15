import React from 'react';
import { Box, H1, H2, Text, Illustration } from '@adminjs/design-system';

const Dashboard = () => {
  return (
    <Box variant="grey">
      <Box variant="white">
        <Box>
          <H1>Welkom bij het Wasgeurtje.nl Admin Panel</H1>
          <Text>
            Beheer producten, bestellingen en algemene instellingen van je webshop via dit
            admin dashboard.
          </Text>
        </Box>
        <Box mt="xl">
          <H2>Snelle links</H2>
          <Box flex flexDirection="row" flexWrap="wrap">
            <Box width={[1, 1/2, 1/3]} p="md">
              <Box variant="card" p="xl" as="a" href="/admin/resources/product">
                <Text textAlign="center">Producten beheren</Text>
              </Box>
            </Box>
            <Box width={[1, 1/2, 1/3]} p="md">
              <Box variant="card" p="xl" as="a" href="/admin/resources/order">
                <Text textAlign="center">Bestellingen bekijken</Text>
              </Box>
            </Box>
            <Box width={[1, 1/2, 1/3]} p="md">
              <Box variant="card" p="xl" as="a" href="/admin/resources/fragrance">
                <Text textAlign="center">Geuren beheren</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt="xl">
          <H2>Hulp nodig?</H2>
          <Text>
            Bekijk de volledige documentatie of neem contact op met support
            als je vragen hebt over het beheren van je webshop.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 