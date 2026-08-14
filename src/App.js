import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, Row, Col, Modal } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import cookie from 'react-cookies';

// Logos e Imagens
import logoLaranja from './content/imgs/logo-branca-laranja.png';
import logoPB from './content/imgs/logo-preto-branco.png';
import icoBR from './content/imgs/flag-ico-br.png';
import icoUS from './content/imgs/flag-ico-us.png';
import logoFacebook from './content/imgs/facebook-logo-3-1.png';
import logoYoutube from './content/imgs/youtube-grey.png';
import logoWapp from './content/imgs/wapp.png';
import logoInsta from './content/imgs/logo-instagram-png-fundo-transparente9.png';

// Portfólio
import financial from './content/imgs/info_recebimento.png';
import medico from './content/imgs/medicon_youtube.png';
import ecomerce from './content/imgs/e-commerce.png';
import petshop from './content/imgs/petshop.png';
import logistic from './content/imgs/logistica_youtube.png';
import food from './content/imgs/food_youtube.png';
import bank from './content/imgs/m1bank_yout.png';
import games from './content/imgs/loc_yout.png';
import real_state from './content/imgs/REAL.png';
import psicologia from './content/imgs/psicologa.png';
import erp from './content/imgs/Erp2.png';
import viska_mobile from './content/imgs/viska_mobile_cover.png';
import banco from './content/imgs/painel_financ.png';

import langPT from './resources/pt';
import langUS from './resources/us';
import './content/css/App.css';

function App() {
  const [langSelect, setLang] = useState(cookie.load('lang-c615') || 'pt');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const canvasRef = useRef(null);

  const lang = langSelect === 'pt' ? langPT : langUS;
  const prod = lang.produtos || {};

  const changeLanguage = (l) => {
    setLang(l);
    cookie.save('lang-c615', l);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  // Converte links normais, shorts e encurtados para embed
const getEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('/embed/')) return url;

  // Trata formato Shorts (ex: youtube.com/shorts/sjko7BLkrTw)
  if (url.includes('/shorts/')) {
    const shortId = url.split('/shorts/')[1].split('?')[0].split('&')[0];
    return 'https://www.youtube.com/embed/' + shortId;
  }

  // Trata formatos comuns (youtu.be/ID ou youtube.com/watch?v=ID)
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? 'https://www.youtube.com/embed/' + match[2]
    : url;
};

// Verifica se a URL original é um Short
const isShortVideo = (url) => {
  return url && url.includes('/shorts/');
};

  // Efeito Matrix Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    canvas.width = window.innerWidth;
    canvas.height = 650;

    const letters = '01JADS010101SYSTEMS0101';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF66';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    const handleResize = () => {
      canvas.width = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Intersection Observer para disparar animações no Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const portfolioItems = [
    { title: prod.text3 || 'Financeiro', img: financial, videoUrl: 'https://youtu.be/uRGF5LH_EUowatch?v=uRGF5LH_EUo', tag: 'Sistemas Financeiros' },
    { title: prod.text4 || 'Médico', img: medico, videoUrl: 'https://www.youtube.com/embed/0JO28hJSguk', tag: 'Saúde & Gestão' },
    { title: prod.text5 || 'E-commerce', img: ecomerce, videoUrl: 'https://www.youtube.com/embed/R5UJYPsgPpc', tag: 'Vendas Online' },
    { title: prod.text10 || 'E-commerce Pet', img: petshop, videoUrl: 'https://www.youtube.com/embed/TcflFrPPHjg', tag: 'Petcare Platform' },
    { title: prod.text6 || 'Logística', img: logistic, videoUrl: 'https://www.youtube.com/embed/M1r5T-QhuBI', tag: 'Tracking & Entregas' },
    { title: prod.text7 || 'Restaurante / Food', img: food, videoUrl: 'https://www.youtube.com/embed/KzPmznbQ8BY', tag: 'Cardápios & Delivery' },    
    { title: prod.text12 || 'Painel Financeiro', img: banco, videoUrl: 'https://youtu.be/7fyol4HwB0Q', tag: 'Planilha de Luxo' },    
    { title: prod.text11 || 'Sistemas Empresariais', img: erp, videoUrl: 'https://youtu.be/8I7JQi0oy-4', tag: 'ERP' },
    // { title: prod.text9 || 'Locadora / Games', img: games, videoUrl: 'https://www.youtube.com/embed/RTUPBXj7FGw', tag: 'Entertainment' },
    { title: 'Imobiliário (Real Estate)', img: real_state, videoUrl: 'https://youtu.be/JRmWiv-TFE8', tag: 'Gestão de Imóveis' },
    { title: 'Psicologia & Clínicas', img: psicologia, videoUrl: 'https://www.youtube.com/embed/REjmAhYdJ3I', tag: 'Agendamentos' },
    { 
      title: 'Gerenciamento de obras', 
      img: viska_mobile, 
      videoUrl: 'https://youtube.com/shorts/yky1zPI-FrU', 
      tag: 'Aplicativo empresarial' 
    },
    { 
      title: 'Fintech', 
      img: bank, 
      videoUrl: 'https://www.youtube.com/shorts/sjko7BLkrTw', 
      tag: 'Fintech Bancária' 
    }
  ];

  return (
    <div className="site-wrapper">
      {/* NAVBAR */}
      <Navbar className="custom-navbar" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home" onClick={() => scrollToSection('home')}>
            <img alt="Logo JADS" src={logoPB} className="nav-logo" />
          </Navbar.Brand>

          <div className="langs d-flex align-items-center me-3">
            <img alt="Português" src={icoBR} className={'lang-flag ' + (langSelect === 'pt' ? 'active-lang' : '')} onClick={() => changeLanguage('pt')} />
            <img alt="English" src={icoUS} className={'lang-flag ' + (langSelect === 'us' ? 'active-lang' : '')} onClick={() => changeLanguage('us')} />
          </div>

          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav" className="justify-content-end">
            <Nav className="nav-menu">
              <Nav.Link onClick={() => scrollToSection('quem-somos')}>{lang.menu.quemSomos}</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('onde-atuamos')}>{lang.menu.ondeAtuamos}</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('produtos')}>{lang.menu.produtos}</Nav.Link>
              <Nav.Link onClick={() => scrollToSection('fale-conosco')} className="btn-contact-nav">{lang.menu.faleConosco}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* HERO SECTION COM MATRIX E MÓDULO SLIDER */}
      <header id="home" className="hero-section">
        <canvas ref={canvasRef} className="matrix-canvas" />
        <div className="hero-overlay">
          <Container>
            <div className="hero-content text-center animate-fade-in">
              <div className="hero-logo-box">
                <img alt="Logo JADS Suporte" src={logoLaranja} className="hero-logo-main animated-float" />
                <div className="ambient-glow"></div>
              </div>
              <h1 className="hero-title">Inovação, Suporte e Alta Tecnologia</h1>
              <p className="hero-subtitle">Transformamos desafios corporativos em plataformas digitais escaláveis.</p>
            </div>

            {/* SLIDER HERO */}
            <div className="hero-carousel-wrapper animate-slide-up">
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={4500}
                transitionTime={700}
                stopOnHover={true}
              >
                {portfolioItems.slice(0, 10).map((item, idx) => (
                  <div key={idx} className="carousel-slide-item" onClick={() => setSelectedVideo(item.videoUrl)}>
                    <img src={item.img} alt={item.title} />
                    <div className="carousel-glass-caption">
                      <h4>{item.title}</h4>
                      <span className="badge-tag">{item.tag}</span>
                      <p className="click-to-watch">▶ Clique para assistir a demonstração</p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </Container>
        </div>
      </header>

      {/* QUEM SOMOS */}
      <section id="quem-somos" className="section-padding dark-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={5} className="mb-4 mb-lg-0">
              <div className="section-header animate-on-scroll slide-left">
                <span className="section-tag">Sobre Nós</span>
                <h2>{lang.menu.quemSomos}</h2>
                <div className="glowing-line"></div>
                <p className="section-motto mt-3">Excelência técnica e comprometimento com resultados de alta performance.</p>
              </div>
            </Col>
            <Col lg={7}>
              <div className="glass-card p-4 p-md-5 animate-on-scroll slide-right">
                <p className="text-light-p">{lang.quemSomos.text1}</p>
                <p className="text-light-p">{lang.quemSomos.text2}</p>
                <p className="text-light-p">{lang.quemSomos.text3}</p>
                <p className="text-light-p mb-0">{lang.quemSomos.text4}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ONDE ATUAMOS */}
      <section id="onde-atuamos" className="section-padding light-section">
        <Container>
          <div className="text-center mb-5 animate-on-scroll fade-up">
            <span className="section-tag-dark">Especialidades</span>
            <h2 className="title-dark">{lang.menu.ondeAtuamos}</h2>
            <p className="lead-text mt-3">{lang.ondeAtuamos.text1}</p>
          </div>

          <Row className="g-4">
            {lang.ondeAtuamos.produtos.map((p, i) => (
              <Col md={6} lg={4} key={i}>
                <div className={'service-card h-100 animate-on-scroll fade-up delay-' + ((i % 3) + 1)}>
                  <div className="service-icon-box">0{i + 1}</div>
                  <h3>{p.nome}</h3>
                  <p>{p.valor}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* PRODUTOS / SISTEMAS DESENVOLVIDOS */}
      <section id="produtos" className="section-padding dark-section">
        <Container>
          <div className="text-center mb-5 animate-on-scroll fade-up">
            <span className="section-tag">Portfólio em Ação</span>
            <h2>{lang.menu.produtos}</h2>
            <p className="text-muted-p">{prod.text2 || 'Conheça alguns dos sistemas e soluções que desenvolvemos para nossos clientes.'}</p>
          </div>

          <Row className="g-4">
            {portfolioItems.map((item, index) => (
              <Col md={6} lg={4} key={index}>
                <div
                  className={'portfolio-card animate-on-scroll zoom-in delay-' + ((index % 3) + 1)}
                  onClick={() => setSelectedVideo(item.videoUrl)}
                >
                  <div className="portfolio-thumb">
                    <img src={item.img} alt={item.title} />
                    <div className="play-overlay">
                      <span className="play-icon">▶</span>
                    </div>
                  </div>
                  <div className="portfolio-info">
                    <span className="portfolio-tag">{item.tag}</span>
                    <h4>{item.title}</h4>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FALE CONOSCO / FOOTER */}
      <footer id="fale-conosco" className="footer-section">
        <Container>
          <Row className="gy-4 align-items-center">
            <Col lg={4} className="animate-on-scroll fade-up">
              <img src={logoPB} alt="JADS" className="mb-3 footer-logo" />
              <p className="footer-desc">Soluções completas em Tecnologia, Desenvolvimento Full Stack e Suporte Especializado.</p>
            </Col>
            <Col lg={4} className="text-lg-center animate-on-scroll fade-up delay-1">
              <h5>Contato Direto</h5>
              <p className="contact-info">📞 +55 21 97954-9810</p>
              <p className="contact-info">✉️ jadsuporte2021@gmail.com</p>
            </Col>
            <Col lg={4} className="text-lg-end animate-on-scroll fade-up delay-2">
              <h5>Conecte-se conosco</h5>
              <div className="social-links-box">
                <a href="https://wa.me/5521979549810" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <img alt="WhatsApp" src={logoWapp} />
                </a>
                <a href="https://www.instagram.com/jadssuporte/" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <img alt="Instagram" src={logoInsta} />
                </a>
                <a href="https://www.facebook.com/Jardim-Atl%C3%A2ntico-Digital-Suporte-102864572135855" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <img alt="Facebook" src={logoFacebook} />
                </a>
                <a href="https://www.youtube.com/channel/UCJC_XZtqk1fRs3pQlmSyfTQ" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <img alt="YouTube" src={logoYoutube} />
                </a>
              </div>
            </Col>
          </Row>
          <div className="footer-bottom text-center">
            <p>© {new Date().getFullYear()} JADS Suporte - Todos os direitos reservados.</p>
          </div>
        </Container>
      </footer>

      {/* MODAL DE VÍDEO */}
      {/* MODAL DE VÍDEO COMPATÍVEL COM VÍDEOS NORMAIS E SHORTS */}
    <Modal 
      show={!!selectedVideo} 
      onHide={() => setSelectedVideo(null)} 
      size={isShortVideo(selectedVideo) ? "sm" : "lg"} 
      centered 
      contentClassName="video-modal-content"
    >
    <Modal.Header closeButton closeVariant="white">
      <Modal.Title style={{ color: '#fff', fontSize: 18 }}>Apresentação do Sistema</Modal.Title>
    </Modal.Header>
    <Modal.Body className="p-0 d-flex justify-content-center">
      {selectedVideo && (
        <div 
          className={isShortVideo(selectedVideo) ? "shorts-container" : "ratio ratio-16x9"}
          style={isShortVideo(selectedVideo) ? { width: '100%', maxWidth: '340px', height: '600px' } : {}}
        >
          <iframe
            src={getEmbedUrl(selectedVideo)}
            title="Apresentação do Sistema"
            style={{ width: '100%', height: '100%', border: 0, borderRadius: '0 0 14px 14px' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </Modal.Body>
  </Modal>
    </div>
  );
}

export default App;