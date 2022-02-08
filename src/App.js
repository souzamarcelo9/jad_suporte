import React, { useState } from 'react'
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import logoLaranja from './content/imgs/logo-branca-laranja.png'
import logoPB from './content/imgs/logo-preto-branco.png'
import icoBR from './content/imgs/flag-ico-br.png'
import icoUS from './content/imgs/flag-ico-us.png'
import './content/css/App.css'
import langPT from './resources/pt'
import langUS from './resources/us'
import cookie from 'react-cookies'
import logoJads from './content/imgs/tropical_beach_gif.gif'
import logoMeio from './content/imgs/s.png'
import logoFacebook from './content/imgs/facebook-logo-3-1.png'
import { Linking } from 'react-native'
import congasp from './content/imgs/financeiro.jpg'
import medico  from './content/imgs/medicina.png'
import logoYoutube from './content/imgs/youtube-grey.png'
import logoWapp from './content/imgs/wapp.png'
import ecomerce from './content/imgs/ecommerce.png'
import logistic from './content/imgs/logistic-icon-png-12699.png'
import logoInsta from './content/imgs/logo-instagram-png-fundo-transparente9.png'
import food from './content/imgs/food.jpeg'
import bank from './content/imgs/bank.jpg'
import games from './content/imgs/games.jpeg'
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import {SafeAreaView} from 'react-native';
//import Gallery from 'react-native-image-gallery';

import ReactPlayer from "react-player"
//import Video from "react-native-video"
import multivr from './content/imgs/food.mp4';
//import {SafeAreaView, ScrollView} from 'react-native';
//import {SocialIcon} from 'react-native-elements';
import  {useEffect} from 'react';

function _goTo(element) {
  window.scrollTo({
    left: 0,
    top: document.getElementById(element).offsetTop - 20,
    behavior: 'smooth'
  });
}

function App() {
  let lang = null;

  const [langSelect, setLang] = useState(cookie.load('lang-c615') || 'pt');
  const image = { uri: "../src/content/imgs/tropical.png" };
  var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
  

  if (!langSelect)
    cookie.save('lang-c615', 'pt');

  if (langSelect === 'pt')
    lang = langPT;
  else
    lang = langUS;

  return (
    <React.Fragment>
      <Navbar style={{ background: '#030303fd' }} expand="lg" sticky="top"   >
        <Container>
          <Navbar.Brand href="/" >
            <img alt="Logo da JAD" src={logoPB} style={{ width: 100 }} />
          </Navbar.Brand>
          <div className="langs">
            <img alt="Icone de Idioma Português" src={icoBR} onClick={() => { setLang('pt'); cookie.save('lang-c615', 'pt'); }} ></img>
            <img alt="Language icon to English" src={icoUS} onClick={() => { setLang('us'); cookie.save('lang-c615', 'us'); }}></img>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link onClick={() => _goTo('quem-somos')} >{lang.menu.quemSomos}</Nav.Link>
              <Nav.Link onClick={() => _goTo('onde-atuamos')}  >{lang.menu.ondeAtuamos}</Nav.Link>
              <Nav.Link onClick={() => _goTo('fale-conosco')}  >{lang.menu.faleConosco}</Nav.Link>
              <Nav.Link onClick={() => _goTo('produtos')}  >{lang.menu.produtos}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <header>
        <div className="panelLogo" expand="lg">

           { <Container style={{ width: 0.0}}>
            {
                                    
              <img alt="Logo da JAD" src={logoLaranja} style={{ width:500 }}/>            
             
             }    

            </Container> 
           }
        </div>
      </header>
      <div id="quem-somos">
        <Container>
          <Row className="quem-somos" >
            <Col md={4}><h2>{lang.menu.quemSomos}</h2></Col>
            <Col md={8}>
              <p>{lang.quemSomos.text1}</p>
              <p>{lang.quemSomos.text2}</p>
              <p>{lang.quemSomos.text3}</p>
              <p>{lang.quemSomos.text4}</p>
            </Col>
          </Row>
        </Container>
      </div>
      <div id="onde-atuamos">
        <Container>
          <Row className="onde-atuamos">
            <Col md={4}><h2>{lang.menu.ondeAtuamos}</h2></Col>
            <Col md={8}> {lang.ondeAtuamos.text1}</Col>
          </Row>
          <Row className="customRow">
            <ul>
              {
                lang.ondeAtuamos.produtos.map((p, i) => {
                  return (
                    <li key={i}><h3>{p.nome}</h3> <div className="descricaoProduto">{p.valor}</div></li>
                  )
                })
              }
            </ul>
          </Row>
        </Container>
      </div>
      <div id="fale-conosco">
        <Container>
          <Row className="fale-conosco" >
            <Col ><h2>{lang.menu.faleConosco}</h2></Col>
          </Row>
          <Row className="customRow">
            <Col sm>Telefones<br />Email</Col>
            <Col sm>+55 21 97954-9810<br />jadsuporte2021@gmail.com</Col>
            
            <Row className ="customRow" style={{paddingRight: 80}}>
            <Col><img alt="facebook" src={logoFacebook} style={{ width: 50}}/><br /> <Text style={{color: 'blue'}}onPress={() => Linking.openURL('https://www.facebook.com/Jardim-Atl%C3%A2ntico-Digital-Suporte-102864572135855')}>facebook</Text></Col>
            <Col><img alt="youtube" src={logoYoutube} style={{ width: 50}}/><br /> <Text style={{color: 'blue'}}onPress={() => Linking.openURL('https://www.youtube.com/channel/UCJC_XZtqk1fRs3pQlmSyfTQ')}>youtube</Text></Col>
            <Col><img alt="wapp" src={logoWapp} style={{ width: 50}}/><br /> <Text style={{color: 'blue'}}onPress={() => Linking.openURL('wa.me/message/OU2GVJMYI2J6E1')}>whats'app</Text></Col>
            <Col><img alt="insta" src={logoInsta} style={{ width: 50}}/><br /> <Text style={{color: 'blue'}}onPress={() => Linking.openURL('https://www.instagram.com/souzamarcelooficial/')}>instagram</Text></Col>

          </Row>
          
          </Row>

        </Container>
      </div>
      <div id="produtos">
        <Container>
          <Row className="fale-conosco" >
            <Col ><h2>{lang.menu.produtos}</h2></Col>
          </Row>
          <Row className="fale-conosco" >
            <Col ><h5>{lang.produtos.text2}</h5></Col>
          </Row>
          <Row className="customRow">                        
            <Row className ="customRow" style={{paddingRight: 80}}>
            <Col><a href="https://www.youtube.com/watch?v=v5nedwFnQEE"><img alt="congasp" src={congasp} style={{ width: 80,height:60}}/><br /> <Text style={{color: 'blue'}}onPress={() => Linking.openURL('https://www.youtube.com/watch?v=v5nedwFnQEE')}>{lang.produtos.text3}</Text></a></Col>
            <Col><a href="https://www.youtube.com/watch?v=0JO28hJSguk"><img alt="medicom" src={medico} style={{ width: 60,height:60}}/><br /> <Text style={{color: 'blue'}}onPress={() => Linking.openURL('https://www.youtube.com/watch?v=0JO28hJSguk')}>{lang.produtos.text4}</Text></a></Col>
            <Col><a href="https://www.youtube.com/watch?v=R5UJYPsgPpc"><img alt="loja" src={ecomerce} style={{ width: 80,height:60}}/><br /> <Text style={{color: 'blue'}}onPress={() => Linking.openURL('https://www.youtube.com/watch?v=R5UJYPsgPpc')}>{lang.produtos.text5}</Text></a></Col>
            <Col><a href="https://www.youtube.com/watch?v=boUf-wtlXMI"><img alt="maxlogistica" src={logistic} style={{ width: 60,height:58}}/><br /> <Text style={{color: 'blue'}}onPress={() => Linking.openURL('https://youtu.be/OMbWfy9thLY ')}>{lang.produtos.text6}</Text></a></Col>
            <Col><a href="https://youtu.be/KzPmznbQ8BY"><img alt="food" src={food} style={{ width: 60,height:58}}/><br /> <Text style={{color: 'blue'}}onPress={() => Linking.openURL('https://youtu.be/KzPmznbQ8BY')}>{lang.produtos.text7}</Text></a></Col>
            <Col><a href="https://www.youtube.com/watch?v=zJza3wgUy9Q"><img alt="banco" src={bank} style={{ width: 60,height:58}}/><br /> <Text style={{color: 'blue'}}onPress={() => Linking.openURL('https://www.youtube.com/watch?v=zJza3wgUy9Q')}>{lang.produtos.text8}</Text></a></Col>
            <Col><a href="https://www.youtube.com/watch?v=RTUPBXj7FGw&t=83s"><img alt="logcom" src={games} style={{ width: 60,height:58}}/><br /> <Text style={{color: 'blue'}}onPress={() => Linking.openURL('https://www.youtube.com/watch?v=RTUPBXj7FGw&t=83s')}>{lang.produtos.text9}</Text></a></Col>

          </Row>
          
          </Row>
        

{/*             
            <WebView
        style={ {  marginTop: (Platform.OS == 'ios') ? 20 : 0,} }
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: 'https://www.youtube.com/embed/'+this.state.pictureData.idVideo }}
    /> */}
    {/* <View>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={'84WIaK3bl_s'}
      />
    </View> */}
          
        </Container>
      </div>
    </React.Fragment>
  );
}




export default App;
