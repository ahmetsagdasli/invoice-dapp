import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Twitter,
  Favorite,
  Code,
  Security
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        backgroundColor: '#1e1e1e',
        color: 'white'
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          {/* Main Footer Content */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'center', md: 'flex-start' }}
            spacing={3}
          >
            {/* Branding */}
            <Box textAlign={{ xs: 'center', md: 'left' }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                🧾 Invoice DApp
              </Typography>
              <Typography variant="body2" color="grey.400" sx={{ maxWidth: 300 }}>
                Modern blockchain tabanlı fatura yönetim sistemi. 
                Ethereum üzerinde güvenli, şeffaf ve merkezi olmayan çözüm.
              </Typography>
            </Box>

            {/* Quick Links */}
            <Stack direction="row" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Özellikler
                </Typography>
                <Link href="#" color="grey.400" underline="hover" variant="body2">
                  Fatura Kaydetme
                </Link>
                <Link href="#" color="grey.400" underline="hover" variant="body2">
                  IPFS Depolama
                </Link>
                <Link href="#" color="grey.400" underline="hover" variant="body2">
                  Blockchain Güvenlik
                </Link>
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Kaynak
                </Typography>
                <Link 
                  href="https://github.com/ahmetsagdasli/invoice-dapp" 
                  color="grey.400" 
                  underline="hover" 
                  variant="body2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repo
                </Link>
                <Link href="#" color="grey.400" underline="hover" variant="body2">
                  Dokümantasyon
                </Link>
                <Link href="/about" color="grey.400" underline="hover" variant="body2">
                  Hakkında
                </Link>
              </Stack>
            </Stack>

            {/* Social Links */}
            <Stack direction="row" spacing={1}>
              <Tooltip title="GitHub">
                <IconButton
                  href="https://github.com/ahmetsagdasli"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                >
                  <GitHub />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                >
                  <LinkedIn />
                </IconButton>
              </Tooltip>
              <Tooltip title="Twitter">
                <IconButton
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
                >
                  <Twitter />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: 'grey.700' }} />

          {/* Tech Stack */}
          <Box textAlign="center">
            <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              💻 Teknoloji Stack
            </Typography>
            <Stack 
              direction="row" 
              spacing={3} 
              justifyContent="center" 
              flexWrap="wrap"
              sx={{ gap: 2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Code fontSize="small" />
                <Typography variant="caption">React + TypeScript</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Security fontSize="small" />
                <Typography variant="caption">Ethereum + Solidity</Typography>
              </Box>
              <Typography variant="caption">Material-UI</Typography>
              <Typography variant="caption">IPFS</Typography>
              <Typography variant="caption">Hardhat</Typography>
              <Typography variant="caption">Ethers.js</Typography>
            </Stack>
          </Box>

          <Divider sx={{ borderColor: 'grey.700' }} />

          {/* Copyright */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body2" color="grey.400" textAlign="center">
              © {currentYear} Invoice DApp. Tüm hakları saklıdır.
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2" color="grey.400">
                ❤️ ile kodlandı
              </Typography>
              <Favorite sx={{ fontSize: 16, color: '#f44336' }} />
              <Typography variant="body2" color="grey.400">
                tarafından
              </Typography>
              <Link
                href="https://github.com/ahmetsagdasli"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: '#2196F3', 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                ahmetsagdasli
              </Link>
            </Box>
          </Stack>

          {/* Build Info */}
          <Box textAlign="center">
            <Typography variant="caption" color="grey.500">
              v1.0.0 • Son güncellenme: 03.08.2025 • Build: {import.meta.env.DEV ? 'Development' : 'Production'}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;