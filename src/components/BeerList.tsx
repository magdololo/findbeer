import {  useState } from 'react';
import {  useNavigate, useSearchParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2'
import { CircularProgress, Divider, Pagination } from '@mui/material';
import { Container, Stack } from '@mui/system';
import BoltIcon from '@mui/icons-material/Bolt';

import { useGetBeersQuery } from '../app/beerApiSlice';

const BeerList = ()=>{
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromQueryString = searchParams.get("page")
    const [page, setPage] = useState(pageFromQueryString ? Number(pageFromQueryString) : 1);
    const [maxPage, setMaxPage] = useState<number>(page)
    const { data, error, isLoading } = useGetBeersQuery(page)

    if(data?.length === 12 && maxPage===page){
        setMaxPage(maxPage+1)
    }
    
    const handlePageChange = (event: React.ChangeEvent<unknown>, page:number)=>{
        setPage(page)
        searchParams.set("page", page.toString())
        setSearchParams(searchParams)
    }

    const handleOnBeerClick = (event: React.ChangeEvent<unknown>, beerId: number) =>{
        navigate('/beer/'+beerId)
    }

    return(
        <>
        <Container>
           <Typography variant='h1' marginTop='50px' marginBottom='50px' color='GrayText'>Beers</Typography>
        </Container>
        {error && <Stack alignItems="center" marginTop='50px'>Sorry something went wrong</Stack>}
        {isLoading && <Stack alignItems="center" marginTop='50px'><CircularProgress /></Stack>}
        <Container>
        <Grid2 container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
        {data?.map((beer) =>{
                    return (
            <Grid2 xs={12} lg={3} key={beer.id} >

                <Card  onClick={(event)=> handleOnBeerClick(event, beer.id)} role="beerCard">
                    <CardMedia
                        component="img"
                        sx={{ height: 100, objectFit: "scale-down", marginTop:2}}
                        image={beer.image_url}
                        title={beer.name}
                    />
                    <CardContent sx={{minHeight: 150}}>
                        <Typography  variant="h6" component="div" marginBottom='20px'  >
                        {beer.name.length < 18? beer.name:beer.name.substring(0,18)+'...'}
                        </Typography>
                        <Divider><BoltIcon/></Divider>
                        <Typography variant="subtitle1" color="text.secondary" marginTop='20px'>
                        {beer.tagline.length < 45? beer.tagline:beer.tagline.substring(0,45)+'...'}
                        </Typography>
                    </CardContent>
                    </Card>

            </Grid2>)
                })}
        </Grid2>
        </Container>
        <Stack alignItems="center" marginTop='20px'>
            <Pagination  count={maxPage} page={page} onChange={handlePageChange} />
        </Stack>
        </>
    )
}
export default BeerList