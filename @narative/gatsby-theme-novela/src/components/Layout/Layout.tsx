import React, { useEffect } from 'react';
import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { useColorMode } from 'theme-ui';

import NavigationFooter from '@components/Navigation/Navigation.Footer';
import NavigationHeader from '@components/Navigation/Navigation.Header';
import ArticlesContextProvider from '../../sections/articles/Articles.List.Context';

import { globalStyles } from '@styles';
import mediaqueries from '@styles/media';

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
const Layout: React.FC<{}> = ({ children, hero }) => {
  const [colorMode] = useColorMode();

  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*');
  }, [colorMode]);

  return (
    <ArticlesContextProvider>
      <HeroContainer>
        <Global styles={globalStyles} />
        <NavigationHeader />
        {hero}
      </HeroContainer>
      <Container>
        <Global styles={globalStyles} />
        {children}
        <NavigationFooter />
      </Container>
    </ArticlesContextProvider>
  );
}

export default Layout;

const Container = styled.div`
  position: relative;
  background: ${p => p.theme.colors.background};
  transition: ${p => p.theme.colorModeTransition};
`;

const HeroContainer = styled(Container)`
  background: ${p => p.theme.colors.heroBackground};
  box-shadow: 0 15px 30px -10px rgba(0,0,0,0.3);

  margin-bottom: 100px;
  padding-bottom: 100px;

  ${mediaqueries.desktop`
    margin-bottom: 80px;
    padding-bottom: 80px;
  `};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
    padding-bottom: 60px;
  `};
`;
