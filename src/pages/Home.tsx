import { useState, useEffect} from 'react'
import { Card, CardHeader, CardBody, CardFooter , Text, Flex, Center, Container, VStack, Heading, Box, Spinner} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useDataBase } from '../state/DataBase';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { TeacherInfo } from '../state/data/TeacherInfo';


function Home() {
  let data = useDataBase((state) => state.data);
  const fetchData = useDataBase((state) => state.fetchData);

  useEffect(() => {fetchData();}, []);

  return (
    <Container maxW='full' centerContent>
      <VStack>
        <Box p={5}><Heading>どこいる先生</Heading></Box>

        {data.map((item) =>
          <>
          <Link to={"detail"} state={item}>
          <Card minWidth={"500px"}>
          <Box p={5}>
              <Heading size={"md"}>
                  <Text>{item.TeachersName}先生</Text>
              </Heading>
              <Text>{item.status}</Text>
          </Box>
          </Card>
          </Link>
          </>
        )}
      </VStack>
    </Container>

  )
}

export default Home
