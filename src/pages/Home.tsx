import { useState, useEffect} from 'react'
import { Card, CardHeader, CardBody, CardFooter , Text, Flex, Center, Container, VStack, Heading, Box, Spinner, InputGroup, InputLeftElement, Input, Spacer} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { TeacherInfo } from '../state/data/TeacherInfo';
import { useDataBase } from '../state/DataBase';
import { SearchIcon } from '@chakra-ui/icons';
import { BallTriangle } from 'react-loader-spinner';
import { firebaseDB } from '../firebase';
import { collection, getDocs } from 'firebase/firestore/lite';


function Home() {
//  let data = useDat{aBase((state) => state.data);
  const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  console.log("screenWidth is " + screenWidth.toString());
  const spinnerSize = 100;

  let searchResult = useDataBase((state) => state.searchResult);
  const fetchData = useDataBase((state) => state.fetchData);
  const search = useDataBase((state) => state.search)
  let isLoding = useDataBase((state) => state.isLoading);

  useEffect(() => {
    /*
    const col = collection(firebaseDB, "teachers");
    await getDocs(col)
    */
    fetchData();
  }, []);

  return (
    isLoding
    ? <Container maxW='full' height={screenHeight} centerContent>
      <VStack>
      <Container height={(screenHeight - spinnerSize)/2 - 20}/>
      <BallTriangle
        height={spinnerSize}
        width={spinnerSize}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
      </VStack></Container>

    : <Container width={"100%"} centerContent boxSizing='border-box' paddingX={5}>
      <VStack>
        <Box p={5}><Heading>どこいる先生</Heading></Box>

        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input placeholder='検索' 
            onChange={(event) => search(event.target.value)}
          />
        </InputGroup>

        {searchResult.length == 0
        ? <Text>検索結果がありません</Text>
        : searchResult.map((item) =>
          <><Link to={"detail"} state={item} style={{display: 'inline-block', width: "100%"}}>
            <Box p={5} width={{ base: "100%", md: "500px" }} borderWidth='1px' borderRadius='lg' overflow='hidden' boxSizing='border-box'>
              <Heading size={"md"}>
                  <Text>{item.TeachersName}先生</Text>
              </Heading>
              <Text>{item.status}</Text>
            </Box>
          </Link></>
        )}
      </VStack>
    </Container>

  )
}
/*
          <Card minWidth={{ base: screenWidth, md: "500px" }} maxWidth={{ base: screenWidth, md: "500px" }} boxSizing='border-box'>
          <CardBody>
          <Box p={5}>
              <Heading size={"md"}>
                  <Text>{item.TeachersName}先生</Text>
              </Heading>
              <Text>{item.status}</Text>
          </Box>
          </CardBody>
          </Card>
*/

export default Home
