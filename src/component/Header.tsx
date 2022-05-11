import React from 'react';
import {
    Flex,
    Heading,
    Button,
    useDisclosure,

} from "@chakra-ui/react";
import {
    RiHeartLine,
} from "react-icons/ri";
import Popup from './Modal';
import { Headers } from '../interfaces';
function Header(props: Headers) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { dataWish, setData } = props;
    return (
        <>
            <Flex w="full" mb="32px" justify="space-between" align="center">
                <Heading fontSize="24px">Movies</Heading>
                <Button
                    size="md"
                    colorScheme="pink"
                    leftIcon={<RiHeartLine />}
                    onClick={onOpen}
                >
                    Wishlist
                </Button>
            </Flex>

            <Popup isOpen={isOpen} onClose={onClose} data={dataWish} setData={setData} />
        </>
    );
}

export default Header;