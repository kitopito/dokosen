import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { TeacherInfo } from '../state/data/TeacherInfo';
import { Box, Container, Heading, Spinner, VStack } from '@chakra-ui/react';
import { useDetailModel } from '../state/DetailModel';

const DetailPage = () => {
    const location = useLocation();
    const info = useDetailModel((state) => state.info);
    const setInfo = useDetailModel((state) => state.setInfo);
    
    useEffect(() => {
        const record = location.state;
        setInfo(record);
        console.log(record);
    }, []);

    return (
        info == {} as TeacherInfo 
        ? <Container centerContent><Spinner></Spinner></Container>
        : <Container centerContent>
            <VStack>
                <Box p={5}><Heading>{info.TeachersName}先生</Heading></Box>
                <Heading size="md">{info.status}</Heading>
            </VStack>
        </Container>
    )
}

export default DetailPage