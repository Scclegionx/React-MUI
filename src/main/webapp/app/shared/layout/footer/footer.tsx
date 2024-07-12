import './footer.scss';

import React from 'react';
import {Box, Icon} from "@mui/material";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {Col, Row} from "reactstrap";
// import {
//   mdiFacebook as FacebookIcon,
//   mdiTwitter as TwitterIcon,
//   mdiGithub as GithubIcon,
// } from '@mdi/js'

const Footer = () => (
  <div className="footer page-content">
    {/*<Box*/}
    {/*  mt={5}*/}
    {/*  width={"100%"}*/}
    {/*  display={"flex"}*/}
    {/*  alignItems={"center"}*/}
    {/*  justifyContent="space-between"*/}
    {/*>*/}
    {/*  <div>*/}
    {/*    <Link*/}
    {/*      color={'primary'}*/}
    {/*      // ref={'https://flatlogic.com/'}*/}
    {/*      target={'_blank'}*/}
    {/*      className={classes.link}*/}
    {/*    >*/}
    {/*      Flatlogic*/}
    {/*    </Link>*/}
    {/*    <Link*/}
    {/*      color={'primary'}*/}
    {/*      // ref={'https://flatlogic.com/about'}*/}
    {/*      target={'_blank'}*/}
    {/*      className={classes.link}*/}
    {/*    >*/}
    {/*      About Us*/}
    {/*    </Link>*/}
    {/*    <Link*/}
    {/*      color={'primary'}*/}
    {/*      // href={'https://flatlogic.com/blog'}*/}
    {/*      target={'_blank'}*/}
    {/*      className={classes.link}*/}
    {/*    >*/}
    {/*      Blog*/}
    {/*    </Link>*/}
    {/*  </div>*/}
    {/*  <div>*/}
    {/*    <Link*/}
    {/*      // href={'https://www.facebook.com/flatlogic'}*/}
    {/*      target={'_blank'}*/}
    {/*    >*/}
    {/*      <IconButton aria-label="facebook">*/}
    {/*        <Icon*/}
    {/*          path={FacebookIcon}*/}
    {/*          size={1}*/}
    {/*          color="#6E6E6E99"*/}
    {/*        />*/}
    {/*      </IconButton>*/}
    {/*    </Link>*/}
    {/*    <Link*/}
    {/*      // href={'https://twitter.com/flatlogic'}*/}
    {/*      target={'_blank'}*/}
    {/*    >*/}
    {/*      <IconButton aria-label="twitter">*/}
    {/*        <Icon*/}
    {/*          path={TwitterIcon}*/}
    {/*          size={1}*/}
    {/*          color="#6E6E6E99"*/}
    {/*        />*/}
    {/*      </IconButton>*/}
    {/*    </Link>*/}
    {/*    <Link*/}
    {/*      // href={'https://github.com/flatlogic'}*/}
    {/*      target={'_blank'}*/}
    {/*    >*/}
    {/*      <IconButton*/}
    {/*        aria-label="github"*/}
    {/*        style={{marginRight: -12}}*/}
    {/*      >*/}
    {/*        <Icon*/}
    {/*          path={GithubIcon}*/}
    {/*          size={1}*/}
    {/*          color="#6E6E6E99"*/}
    {/*        />*/}
    {/*      </IconButton>*/}
    {/*    </Link>*/}
    {/*  </div>*/}
    {/*</Box>*/}
    <Row>
      <Col md="12">
        <p>This is your footer</p>
      </Col>
    </Row>
  </div>
);

export default Footer;
