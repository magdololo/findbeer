import ArrowBackIos from "@mui/icons-material/ArrowBackIos"
import { Card, CardContent, CardHeader, CardMedia, CircularProgress, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { skipToken } from "@reduxjs/toolkit/dist/query"
import { useParams } from "react-router"
import { useGetBeerByIdQuery } from "../app/beerApiSlice"
import { useNavigate } from 'react-router-dom';
import { Container, Stack } from "@mui/system"

const BeerDetails = () => {
    const { beerId } = useParams()
    const { data, error, isLoading } = useGetBeerByIdQuery(beerId ?? skipToken)
    const navigate = useNavigate()
    const handleBackIcon = (event: React.ChangeEvent<unknown>) => {
        navigate(-1)
    }
    return (
        <>
            {error && <Stack alignItems="center" marginTop='50px'>Sorry something went wrong</Stack>}
            {isLoading && <Stack alignItems="center" marginTop='50px'><CircularProgress /></Stack>}
            {data &&
                <Grid2 container alignItems="center" justifyContent="center">
                    <Grid2 xs={12} lg={6}>
                        <Card >
                            <CardHeader sx={{ textAlign: 'center' }}
                                title={data.name}
                                subheader={data.tagline}
                            />
                            <CardMedia
                                component="img"
                                sx={{ height: 100, objectFit: "scale-down", marginTop: 2 }}
                                image={data.image_url}
                                title={data.name}
                            />
                            <CardContent >
                                <Typography variant="body2" color="text.secondary" textAlign='center'>
                                    {data.description}
                                </Typography>
                                <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
                                <Typography variant="subtitle1">IBU: {data.ibu}</Typography>
                                <Typography variant="subtitle1">ABV: {data.abv}</Typography>
                                <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
                                <Typography variant="subtitle1">Ingredients</Typography>
                                <Container sx={{ marginLeft: '5px', padding: '5px' }}>
                                    <Typography variant="subtitle1">Yeasts: {data.ingredients.yeast}</Typography>
                                    <TableContainer sx={{ maxWidth: 500, marginTop: 1 }}>
                                        <Typography variant="subtitle1">Malts</Typography>
                                        <Table size="small" aria-label="Malts table" padding="none">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="right">Amount Value</TableCell>
                                                    <TableCell align="right">Amount Unit</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.ingredients.malt.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.amount.value}</TableCell>
                                                        <TableCell align="right">{row.amount.unit}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TableContainer sx={{ maxWidth: 500, marginTop: 2 }}>
                                        <Typography variant="subtitle1">Hops</Typography>
                                        <Table size="small" aria-label="Hops table" padding="none">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Add</TableCell>
                                                    <TableCell>Attribute</TableCell>
                                                    <TableCell align="right">Amount Value</TableCell>
                                                    <TableCell align="right">Amount Unit</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data.ingredients.hops.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell >{row.add}</TableCell>
                                                        <TableCell >{row.attribute}</TableCell>
                                                        <TableCell align="right">{row.amount.value}</TableCell>
                                                        <TableCell align="right">{row.amount.unit}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Container>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            }
            <Stack alignItems="center" marginTop='20px' marginBottom='20px'>
                <ArrowBackIos onClick={handleBackIcon} />
            </Stack>
        </>
    )

}

export default BeerDetails