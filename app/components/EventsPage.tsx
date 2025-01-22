"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import { fetchEvents } from "../services/events";
import SearchBar from "./SearchBar";
import EventCard from "./EventCard";
import DatePicker from "./DatePicker";
import Select from "./Select";
import { BooleanOptions, PriceOptions, TagOptions } from "../utils/options";

const HomeContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  & > span {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const NotFoundContainer = styled.div`
  text-align: center;
  font-size: 1.25rem;
  color: #ff9500;
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ff9500;
  border-radius: 5px;
`;

const ResetButton = styled.button`
  height: 38px;
`;

const FiltersContainer = styled.div`
  display: grid;
  align-items: end;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LoadingCard = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  border-radius: 8px;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: #f0f0f0;
    }
    50% {
      background-color: #e0e0e0;
    }
    100% {
      background-color: #f0f0f0;
    }
  }
`;

const formatOptions = (options: Options | unknown) =>
  options ? (options as Options).map((option) => option.value) : [];

const EventsPage: React.FC<{
  initialEvents: Events;
  initialResultsNumber: number;
}> = ({ initialEvents, initialResultsNumber }) => {
  const [events, setEvents] = useState<Events>(initialEvents);
  const [search, setSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [tags, setTags] = useState<Options | unknown>();
  const [price, setPrice] = useState<Options | unknown>();
  const [accessPMR, setAccessPMR] = useState<Options | unknown>();
  const [accessVisuallyImpaired, setAccessVisuallyImpaired] = useState<
    Options | unknown
  >();
  const [page, setPage] = useState<number>(1);
  const [resultsNumber, setResultsNumber] =
    useState<number>(initialResultsNumber);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lastCardRef = useRef<HTMLDivElement>(null);

  const resetFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setTags([]);
    setPrice([]);
    setAccessPMR([]);
    setAccessVisuallyImpaired([]);
    setPage(1);
  };

  const loadEvents = useCallback(
    async (pageNumber: number) => {
      try {
        if (hasMore) {
          setIsLoading(true);

          const start = (pageNumber - 1) * 20;
          const data = await fetchEvents(
            search,
            start,
            startDate,
            endDate,
            formatOptions(tags),
            formatOptions(price),
            formatOptions(accessPMR),
            formatOptions(accessVisuallyImpaired)
          );
          setHasMore(data.hasMore);
          setResultsNumber(data.total);
          if (pageNumber === 1) {
            setEvents(data.records);
          } else {
            setEvents((prev) => [...prev, ...data.records]);
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [
      search,
      startDate,
      endDate,
      hasMore,
      tags,
      price,
      accessPMR,
      accessVisuallyImpaired,
    ]
  );

  useEffect(() => {
    setHasMore(true);
  }, [search, startDate, endDate, tags]);

  useEffect(() => {
    setPage(1);
    loadEvents(1);
  }, [search, startDate, endDate, tags, price, loadEvents]);

  useEffect(() => {
    if (page > 1) {
      loadEvents(page);
    }
  }, [page, loadEvents]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const lastCard = entries[0];
        if (lastCard.isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (lastCardRef.current) {
      observer.observe(lastCardRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <HomeContainer>
      <Title>Que faire à Paris ? Un test technique pour Beebs par Xavier</Title>
      <SearchBar value={search} onChange={setSearch} />
      <FiltersContainer>
        <DatePicker
          label="Ouverture"
          id="start-date"
          value={startDate}
          onChange={setStartDate}
          max={endDate}
        />
        <DatePicker
          label="Fermeture"
          id="end-date"
          value={endDate}
          onChange={setEndDate}
          min={startDate}
        />
        <Select
          label="Activités"
          options={TagOptions}
          value={tags}
          multiple={true}
          setter={setTags}
        />
        <Select
          label="Prix"
          options={PriceOptions}
          value={price}
          multiple={false}
          setter={setPrice}
        />
        <Select
          label="Accès PMR"
          options={BooleanOptions}
          value={accessPMR}
          multiple={false}
          setter={setAccessPMR}
        />
        <Select
          label="Accès mal voyant"
          options={BooleanOptions}
          value={accessVisuallyImpaired}
          multiple={false}
          setter={setAccessVisuallyImpaired}
        />
        <ResetButton onClick={resetFilters}>
          Réinitialiser les filtres
        </ResetButton>
      </FiltersContainer>

      {resultsNumber > 0 ? (
        <>
          <ResultsContainer>
            <span>
              {resultsNumber} résultat{resultsNumber > 1 ? "s" : ""}
            </span>
          </ResultsContainer>
          <EventsGrid>
            {events.map((event, index) => (
              <EventCard
                key={event.recordid}
                ref={index === events.length - 1 ? lastCardRef : null}
                event={event}
              />
            ))}
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <LoadingCard key={`loading-${index}`} />
              ))}
          </EventsGrid>
        </>
      ) : (
        <NotFoundContainer>
          Aucun résultat, merci de bien vouloir affiner votre recherche selon
          vos besoins
        </NotFoundContainer>
      )}
    </HomeContainer>
  );
};

export default EventsPage;
