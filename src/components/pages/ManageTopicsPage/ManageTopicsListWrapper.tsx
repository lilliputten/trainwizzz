'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { isDev } from '@/constants';
import { useTopicsContext } from '@/contexts/TopicsContext/TopicsContext';
import { TTopicId } from '@/features/topics/types';

import { PageEmpty } from '../shared';
import { ManageTopicsListCard } from './ManageTopicsListCard';

interface TTopicsListProps {
  openAddTopicModal: () => void;
  openDeleteTopicModal: (topicId: TTopicId) => void;
  openEditTopicCard: (topicId: TTopicId) => void;
  openEditQuestionsPage: (topicId: TTopicId) => void;
}

export function ManageTopicsListWrapper(props: TTopicsListProps) {
  const { openAddTopicModal, openDeleteTopicModal, openEditTopicCard, openEditQuestionsPage } =
    props;
  const { topics } = useTopicsContext();

  const hasTopics = !!topics.length;

  return (
    <div
      className={cn(
        isDev && '__ManageTopicsListWrapper', // DEBUG
        'relative flex flex-1 flex-col overflow-hidden',
      )}
    >
      {hasTopics ? (
        <ManageTopicsListCard
          className={cn(
            isDev && '__ManageTopicsListWrapper_Card', // DEBUG
            'relative flex flex-1 flex-col overflow-hidden',
          )}
          topics={topics}
          handleDeleteTopic={openDeleteTopicModal}
          handleEditTopic={openEditTopicCard}
          handleEditQuestions={openEditQuestionsPage}
          handleAddTopic={openAddTopicModal}
        />
      ) : (
        <PageEmpty
          className="size-full flex-1"
          onButtonClick={openAddTopicModal}
          buttonTitle="Add Topic"
          iconName="topics"
          title="No topics have been created yet"
          description="You dont have any topics yet. Add any topic to your profile."
        />
      )}
    </div>
  );
}
