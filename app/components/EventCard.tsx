import Image from "next/image";
import { forwardRef } from "react";
import styled from "styled-components";

import Tag from "./Tag";

const CardWrapper = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px #00000019;
  border: 1px solid #e5e7eb;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 12rem;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const PriceContainer = styled.div`
  gap: 4px;
  display: flex;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
`;

const ContentContainer = styled.div`
  padding: 1rem;
  min-height: 185px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MainContent = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const InfoText = styled.p`
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 3px;
`;

interface EventCardProps {
  event: Event;
}

const EventCard = forwardRef<HTMLDivElement, EventCardProps>(
  ({ event }, ref) => {
    const { fields } = event;
    const tags: string[] = fields.tags?.split(";");

    const isAddress = fields?.address_name && fields?.address_city;
    const isDate = fields.date_start && fields.date_end;
    const hasTags = tags && tags.length > 0;

    return (
      <CardWrapper ref={ref}>
        <ImageContainer>
          <StyledImage src={fields.cover_url} alt={fields.title} fill />
          <PriceContainer>
            {fields.price_type && <Tag label={`💰 ${fields.price_type}`} />}
            {fields.pmr == "1" && <Tag label={`♿️ PMR`} />}
            {fields.blind == "1" && <Tag label={`👁️ Malvoyant`} />}
          </PriceContainer>
        </ImageContainer>
        <ContentContainer>
          <MainContent>
            <Title>{fields.title}</Title>
            {isAddress && (
              <InfoText>
                📍 {fields.address_name}, {fields.address_city}
              </InfoText>
            )}
            <InfoText></InfoText>
            {isDate && (
              <InfoText>
                📅{" "}
                {new Date(fields.date_start).toLocaleDateString() ===
                new Date(fields.date_end).toLocaleDateString()
                  ? new Date(fields.date_start).toLocaleDateString()
                  : `${new Date(
                      fields.date_start
                    ).toLocaleDateString()} - ${new Date(
                      fields.date_end
                    ).toLocaleDateString()}`}
              </InfoText>
            )}
          </MainContent>
          {hasTags && (
            <TagsContainer>
              {tags.map((tag) => (
                <Tag label={tag} key={tag} />
              ))}
            </TagsContainer>
          )}
        </ContentContainer>
      </CardWrapper>
    );
  }
);

EventCard.displayName = "EventCard";

export default EventCard;
