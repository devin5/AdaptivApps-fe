// React imports
import React from 'react';
import NavBar from '../components/NavBar';
import { Wrapper, Box, Flex, Container, Button, Text } from 'adaptiv-ui';
import { useAuth0 } from '../components/auth/react-auth0-spa';
import landingImage from '../assets/images/landingImage.jpeg';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const LandingPage = () => {
  const { user, loginWithRedirect } = useAuth0();
  console.log('user:', user);
  return (
    <IconContext.Provider value={{ color: 'white', size: '3rem' }}>
      <NavBar />
      <Wrapper>
        <Container bg_src={landingImage} invert attach_fix>
          <Flex h="50vh" jc_center ai_center>
            <Flex w="85%" jc_center ai_center>
              <Text f_size="7.2rem" bold ta_center>
                Your Home for Angel City Sports Events and More!
              </Text>
            </Flex>
          </Flex>
        </Container>
        <Box h="6vh" />
        <Flex drape>
          <Flex>
            <h2>Sign Up Now!</h2>
          </Flex>
          <Flex jc_center ai_center>
            <Flex drape w="30%">
              <p>
                Sign Up Now with Facebook or Google, add your profile info, and
                keep track of Angel City Sports Games, Clinics, and other
                events! All the info you need is all in one place - The Angel
                City Sports App.
              </p>
            </Flex>
            <Flex drape w="30%">
              <Button
                bg="#3B5998"
                secondary
                w="26rem"
                onClick={() => loginWithRedirect({})}
              >
                <Flex jc_between ai_center>
                  <FaFacebookSquare />
                  <Box w="2rem" />
                  <Text>Sign up with Facebook</Text>
                </Flex>
              </Button>
              <Button secondary w="26rem" onClick={() => loginWithRedirect({})}>
                <Flex jc_between ai_center>
                  <FaGoogle />
                  <Box w="2rem" />
                  <Text>Sign up with Google</Text>
                  <Box w="2rem" />
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Wrapper>
    </IconContext.Provider>
  );
};

export default LandingPage;