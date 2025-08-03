import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Chip,
  Avatar,
  Link,
  Divider,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  Paper
} from '@mui/material';
import {
  Code,
  Security,
  Speed,
  CloudUpload,
  AccountBalance,
  GitHub,
  LinkedIn,
  Email,
  Star,
  Rocket,
  Shield,
  Storage
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
  const features = [
    {
      icon: <Security />,
      title: 'Blockchain Güvenlik',
      description: 'Ethereum blockchain üzerinde tamper-proof fatura kayıtları'
    },
    {
      icon: <Storage />,
      title: 'IPFS Depolama',
      description: 'Merkezi olmayan dosya depolama ile güvenli fatura dosyaları'
    },
    {
      icon: <Speed />,
      title: 'Hızlı İşlemler',
      description: 'Optimize edilmiş smart contract ile düşük gas maliyeti'
    },
    {
      icon: <CloudUpload />,
      title: 'Kolay Kullanım',
      description: 'Modern ve kullanıcı dostu arayüz tasarımı'
    }
  ];

  const techStack = [
    { name: 'React 18', category: 'Frontend', color: '#61DAFB' },
    { name: 'TypeScript', category: 'Language', color: '#3178C6' },
    { name: 'Material-UI', category: 'UI Library', color: '#0081CB' },
    { name: 'Solidity', category: 'Smart Contract', color: '#363636' },
    { name: 'Ethereum', category: 'Blockchain', color: '#627EEA' },
    { name: 'IPFS', category: 'Storage', color: '#65C2CB' },
    { name: 'Hardhat', category: 'Development', color: '#FFF100' },
    { name: 'Ethers.js', category: 'Web3 Library', color: '#2535A0' },
    { name: 'Node.js', category: 'Backend', color: '#339933' },
    { name: 'Express.js', category: 'API Framework', color: '#000000' }
  ];

  const timeline = [
    {
      title: 'Proje Başlangıcı',
      date: 'Ocak 2025',
      description: 'Blockchain tabanlı fatura yönetim sisteminin kavramsal tasarımı'
    },
    {
      title: 'Smart Contract Geliştirme',
      date: 'Şubat 2025',
      description: 'Solidity ile güvenli ve optimize edilmiş fatura kontratı'
    },
    {
      title: 'Frontend Geliştirme',
      date: 'Mart 2025',
      description: 'React ve TypeScript ile modern kullanıcı arayüzü'
    },
    {
      title: 'IPFS Entegrasyonu',
      date: 'Nisan 2025',
      description: 'Merkezi olmayan dosya depolama sistemi entegrasyonu'
    },
    {
      title: 'Test ve Optimizasyon',
      date: 'Mayıs 2025',
      description: 'Kapsamlı testler ve performans optimizasyonları'
    },
    {
      title: 'Mainnet Lansman',
      date: 'Ağustos 2025',
      description: 'Production ortamında kullanıma hazır versiyon'
    }
  ];

  return (
    <Box className="fade-in">
      <Helmet>
        <title>Hakkında - Invoice DApp</title>
        <meta name="description" content="Invoice DApp projesi hakkında detaylı bilgi, geliştirici ahmetsagdasli ve kullanılan teknolojiler" />
      </Helmet>

      {/* Hero Section */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
          color: 'white',
          p: 6,
          borderRadius: 3,
          mb: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          🧾 Invoice DApp
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
          Modern blockchain teknolojisi ile geliştirilmiş, güvenli ve şeffaf fatura yönetim sistemi
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* Project Description */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Rocket sx={{ mr: 2, color: '#2196F3' }} />
                Proje Hakkında
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                Invoice DApp, Ethereum blockchain teknolojisi kullanarak geliştirilmiş modern bir fatura yönetim sistemidir. 
                Geleneksel fatura sistemlerinin aksine, tüm fatura verileri blockchain üzerinde şeffaf ve değiştirilemez 
                şekilde saklanır.
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                Proje, smart contract teknolojisi ile güvenli fatura kaydı, IPFS ile merkezi olmayan dosya depolama 
                ve modern React tabanlı kullanıcı arayüzü sunar. Kullanıcılar MetaMask wallet'ları ile güvenli bir 
                şekilde sisteme bağlanabilir ve faturalarını yönetebilirler.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Bu proje, Web3 teknolojilerinin gerçek dünya kullanım senaryolarında nasıl uygulanabileceğini 
                göstermek amacıyla geliştirilmiştir ve açık kaynak kod olarak paylaşılmıştır.
              </Typography>
            </CardContent>
          </Card>

          {/* Features */}
          <Card sx={{ borderRadius: 3, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Star sx={{ mr: 2, color: '#2196F3' }} />
                Öne Çıkan Özellikler
              </Typography>
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ color: '#2196F3', mt: 0.5 }}>
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Code sx={{ mr: 2, color: '#2196F3' }} />
                Teknoloji Stack
              </Typography>
              <Grid container spacing={2}>
                {techStack.map((tech, index) => (
                  <Grid item key={index}>
                    <Chip
                      label={tech.name}
                      variant="outlined"
                      sx={{
                        borderColor: tech.color,
                        color: tech.color,
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: `${tech.color}15`
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Developer Info & Timeline */}
        <Grid item xs={12} md={4}>
          {/* Developer Card */}
          <Card sx={{ borderRadius: 3, mb: 4 }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  background: 'linear-gradient(135deg, #2196F3, #21CBF3)'
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  AS
                </Typography>
              </Avatar>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                ahmetsagdasli
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Full Stack Blockchain Developer
              </Typography>
              
              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                <Chip size="small" label="React" />
                <Chip size="small" label="Solidity" />
                <Chip size="small" label="Web3" />
              </Stack>

              <Stack direction="row" spacing={1} justifyContent="center">
                <Link
                  href="https://github.com/ahmetsagdasli"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#2196F3' }}
                >
                  <GitHub />
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#2196F3' }}
                >
                  <LinkedIn />
                </Link>
                <Link
                  href="mailto:contact@ahmetsagdasli.dev"
                  sx={{ color: '#2196F3' }}
                >
                  <Email />
                </Link>
              </Stack>
            </CardContent>
          </Card>

          {/* Project Stats */}
          <Card sx={{ borderRadius: 3, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                📊 Proje İstatistikleri
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Kod Satırı</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>~5,000+</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Dosya Sayısı</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>50+</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Geliştirme Süresi</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>8 Ay</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Smart Contract</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>1</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Test Coverage</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>95%</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                🗓️ Geliştirme Süreçi
              </Typography>
              <Timeline sx={{ p: 0 }}>
                {timeline.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot sx={{ backgroundColor: '#2196F3' }} />
                      {index < timeline.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {item.date}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {item.description}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;