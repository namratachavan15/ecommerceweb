import React from "react";
import { Box, Grid, Typography, Link, Divider } from "@mui/material";

const columns = [
  { title: "ABOUT", items: ["Contact Us", "About Us", "Careers", "Stories", "Press"] },
  { title: "HELP", items: ["Payments", "Shipping", "Cancellation & Returns", "FAQ"] },
  { title: "POLICY", items: ["Return Policy", "Terms of Use", "Security", "Privacy"] },
  { title: "SOCIAL", items: ["Facebook", "Twitter", "YouTube"] },
];

const FooterPage = () => {
  return (
    <Box sx={{ bgcolor: "#070B14", color: "#F4F6FB", mt: 10, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <Box sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 8 } }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 22, mb: 1.5 }}>
              NOVA<span style={{ color: "#4F7CFF" }}>TECH</span>
            </Typography>
            <Typography variant="body2" sx={{ color: "#8993AC", lineHeight: 1.7, maxWidth: 260 }}>
              Your trusted destination for the latest electronics, gadgets and accessories — curated, tested, and delivered fast.
            </Typography>
          </Grid>

          {columns.map((col) => (
            <Grid item xs={6} sm={6} md={2} key={col.title}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: "#4F7CFF", fontWeight: 700, letterSpacing: 1, fontSize: 12 }}>
                {col.title}
              </Typography>
              {col.items.map((text) => (
                <Typography key={text} variant="body2" sx={{ mb: 1, color: "#B7BFD3", cursor: "pointer", "&:hover": { color: "#fff" } }}>
                  {text}
                </Typography>
              ))}
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: "#4F7CFF", fontWeight: 700, letterSpacing: 1, fontSize: 12 }}>
              REGISTERED OFFICE
            </Typography>
            <Typography variant="body2" sx={{ color: "#B7BFD3", lineHeight: 1.7 }}>
              NovaTech Retail Pvt Ltd,<br />
              Ground Floor, Tech Park,<br />
              Kolhapur - 416215, India
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 5 }} />

        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ color: "#5B6584", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
              © {new Date().getFullYear()} NovaTech · Built by StormSofts Technology
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: { xs: "flex-start", md: "flex-end" } }}>
              <Link href="#" underline="hover" sx={{ color: "#8993AC", fontSize: 13, "&:hover": { color: "#4F7CFF" } }}>Become a Seller</Link>
              <Link href="#" underline="hover" sx={{ color: "#8993AC", fontSize: 13, "&:hover": { color: "#4F7CFF" } }}>Advertise</Link>
              <Link href="#" underline="hover" sx={{ color: "#8993AC", fontSize: 13, "&:hover": { color: "#4F7CFF" } }}>Gift Cards</Link>
              <Link href="#" underline="hover" sx={{ color: "#8993AC", fontSize: 13, "&:hover": { color: "#4F7CFF" } }}>Help Center</Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FooterPage;
