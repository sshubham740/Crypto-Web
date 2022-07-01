import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const geckoHeaders= {
    'X-RapidAPI-Key': 'd4743f6193msh0542b6ad88f510ep1e6929jsn13dce77b675c',
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
  }

const cryptonewsHeaders= {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'd4743f6193msh0542b6ad88f510ep1e6929jsn13dce77b675c',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }

const coingeckoBaseUrl='https://coingecko.p.rapidapi.com'
const cryptonewsBaseUrl='https://bing-news-search1.p.rapidapi.com'

const createRequest=(url, headers)=>({url, headers: headers})

export const coinapi=createApi({
    reducerPath: 'coinapi',
    baseQuery: fetchBaseQuery({baseUrl:coingeckoBaseUrl}),
    endpoints: (builder)=>({
        getCryptoStats: builder.query({
            query: ()=> createRequest('/global', geckoHeaders)
        }),
        getCryptoCoins: builder.query({
            query: (count)=> createRequest(`/coins/markets?vs_currency=usd&sparkline=true&per_page=${count}`,geckoHeaders)
        }),
        getCryptoExchanges: builder.query({
            query: ()=> createRequest(`/exchanges`,geckoHeaders)
        }),
        getCryptoChart: builder.query({
            query: ({coinId,days})=> createRequest(`/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,geckoHeaders)
        }),
        getCryptoDetails: builder.query({
            query: (id)=> createRequest(`/coins/${id}?tickers=true&market_data=true&sparkline=true`,geckoHeaders)
        }),
    }),   
});

export const newsapi=createApi({
    reducerPath: 'newsapi',
    baseQuery: fetchBaseQuery({baseUrl:cryptonewsBaseUrl}),
    endpoints: (builder)=>({
        getCryptoNews: builder.query({
            query: ({search,count})=> createRequest(`/news/search?q=${search}&count=${count}&freshness=Day&textFormat=Raw&safeSearch=Off`, cryptonewsHeaders)
        }),
    }),   
});


export const {
    useGetCryptoStatsQuery,
    useGetCryptoCoinsQuery,
    useGetCryptoChartQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoExchangesQuery
}= coinapi

export const {
    useGetCryptoNewsQuery
}=newsapi