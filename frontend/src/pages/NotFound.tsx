import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import {
  Home,
  ArrowBack,
  Search,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}
    >
      <Helmet>
        <title>404 - Sayfa Bulunamadı | Invoice DApp</title>
        <meta name="description" content="Aradığınız sayfa bulunamadı. Ana sayfaya dönebilir veya diğer sayfaları keşfedebilirsiniz." />
      </Helmet>

      <Card sx={{ maxWidth: 600, width: '100%', textAlign: 'center', borderRadius: 3 }}>
        <CardContent sx={{ p: 6 }}>
          <ErrorIcon sx={{ fontSize: 120, color: '#ff6b6b', mb: 3 }} />
          
          <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', fontSize: '4rem', mb: 2 }}>
            404
          </Typography>
          
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Sayfa Bulunamadı
          </Typography>
          
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Ana sayfaya dönebilir veya diğer bölümleri keşfedebilirsiniz.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={() => navigate('/')}
              className="gradient-button"
              size="large"
            >
              Ana Sayfa
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              size="large"
            >
              Geri Dön
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Search />}
              onClick={() => navigate('/search')}
              size="large"
            >
              Arama Yap
            </Button>
          </Stack>

          <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2" color="textSecondary">
              💡 <strong>Yardım:</strong> Eğer bu bir hata olduğunu düşünüyorsanız, 
              lütfen geliştirici ile iletişime geçin.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotFound;