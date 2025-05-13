import React from 'react';
import { Box, Card, Grid, Skeleton } from '@mui/material';

export default function BookSkeletonList() {
  return (
    <Grid container spacing={2} height="80vh" data-testid="skeleton-list">
      <Grid item xs={12} md={3} data-testid="skeleton-large-item">
        <Skeleton
          variant="rectangular"
          sx={{
            width: '90%',
            height: '100%',
            mx: 'auto',
            borderRadius: '20px',
          }}
          data-testid="skeleton-large"
        />
      </Grid>

      <Grid item xs={12} md={9}>
        <Grid container spacing={2} data-testid="skeleton-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} data-testid={`skeleton-card-${index}`}>
              <Card
                sx={{
                  border: '1px solid #F4F0F0',
                  borderRadius: '20px',
                  boxShadow: 'none',
                  py: 3,
                  height: '100%',
                }}
                data-testid={`card-${index}`}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: 150,
                    height: 210,
                    mx: 'auto',
                    borderRadius: '20px',
                  }}
                  data-testid={`skeleton-card-image-${index}`}
                />

                <Box px={3} mt={2} display="flex" flexDirection="column" alignItems="center">
                  <Skeleton
                    variant="text"
                    height={24}
                    width="80%"
                    data-testid={`skeleton-text-${index}-1`}
                  />
                  <Skeleton
                    variant="text"
                    height={20}
                    width="50%"
                    data-testid={`skeleton-text-${index}-2`}
                  />
                  <Skeleton
                    variant="text"
                    height={20}
                    width="60%"
                    data-testid={`skeleton-text-${index}-3`}
                  />
                  <Skeleton
                    variant="text"
                    height={20}
                    width="30%"
                    data-testid={`skeleton-text-${index}-4`}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 2, px: 3 }}>
                  <Skeleton
                    variant="rounded"
                    width="20%"
                    height={36}
                    data-testid={`skeleton-rounded-${index}-1`}
                  />
                  <Skeleton
                    variant="rounded"
                    width="80%"
                    height={36}
                    data-testid={`skeleton-rounded-${index}-2`}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
