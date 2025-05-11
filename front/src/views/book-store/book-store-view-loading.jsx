import { Box, Card, Grid, Skeleton } from '@mui/material';

export default function BookSkeletonList() {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              border: '1px solid #F4F0F0',
              borderRadius: '20px',
              boxShadow: 'none',
              py: 3,
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                width: 150,
                height: 210,
                mx: 'auto',
                borderRadius: '20px',
              }}
            />

            <Box px={3} mt={2} display="flex" flexDirection="column" alignItems="center">
              <Skeleton variant="text" height={24} width="80%" />
              <Skeleton variant="text" height={20} width="50%" sx={{ mb: 1 }} />
              <Skeleton variant="text" height={20} width="60%" />
              <Skeleton variant="text" height={20} width="30%" />
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 2, px: 3 }}>
              <Skeleton variant="rounded" width="20%" height={36} />
              <Skeleton variant="rounded" width="80%" height={36} />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
