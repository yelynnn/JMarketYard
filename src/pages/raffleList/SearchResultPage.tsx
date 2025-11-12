import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard';
import RaffleProps from '../../types/RaffleProps';
import axiosInstance from '../../apis/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import media from '../../styles/media';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const SearchResultPage: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const observerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['searchRaffles', type, isAuthenticated],
      queryFn: async ({ pageParam = 1 }) => {
        const apiUrl = isAuthenticated
          ? 'api/member/search/raffles'
          : 'api/permit/search/raffles';
        const { data } = await axiosInstance.get(apiUrl, {
          params: { keyword: type, page: pageParam, size: 16 },
        });

        return {
          raffles: data.result.searchedRaffles,
          nextPage: data.result.pageInfo.hasNext ? pageParam + 1 : undefined,
        };
      },
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: !!type,
      staleTime: 5 * 60 * 1000,
      initialPageParam: 1,
    });

  console.log('useInfiniteQuery data:', data);
  const raffles = data?.pages.flatMap((page) => page.raffles) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (type && !isLoading) {
      queryClient.invalidateQueries({ queryKey: ['recentSearches'] });
    }
  }, [type, isLoading]);

  return (
    <Wrapper>
      <SearchContainer>
        <KeywordBox>'{type}'</KeywordBox>
        <SearchBox>검색 결과</SearchBox>
      </SearchContainer>

      <ProductGrid>
        {(raffles ?? []).map((newRaffles) => (
          <ProductCard key={newRaffles.raffleId} {...newRaffles} />
        ))}
      </ProductGrid>

      <Observer ref={observerRef} />
    </Wrapper>
  );
};

export default SearchResultPage;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-top: 64px;
  gap: 45px;
  ${media.notLarge`
    padding:57px 0px 30px 0px;
    width:100%
  `}
`;

const SearchContainer = styled.div`
  display: inline-flex;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 11px;
  border: 1px solid #8f8e94;
`;

const KeywordBox = styled.div`
  color: #c908ff;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 184.159% */
`;

const SearchBox = styled.div`
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36.832px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  gap: 56px;
  width: 100%;

  ${media.medium`
    grid-template-columns: repeat(3, 1fr);
    gap:11px;
  `}
  ${media.small`
    grid-template-columns: repeat(1, 1fr);
    gap:0px;
  `}
`;
const Observer = styled.div`
  width: 100%;
  height: 50px;
  // background-color: yellow;
`;
