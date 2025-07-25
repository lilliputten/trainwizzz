'use client';

import React from 'react';

import { SelectTopicLanguageModal } from '@/components/pages/SelectTopicLanguageModal';
import { useTopicsContext } from '@/contexts/TopicsContext';

interface SelectTopicLanguageModalPageProps {
  params: Promise<{
    topicId: string;
  }>;
  searchParams: Promise<{
    langCode?: string;
    langName?: string;
    langCustom?: string;
  }>;
}

export default function SelectTopicLanguageModalInterceptingRoute({
  params,
  searchParams,
}: SelectTopicLanguageModalPageProps) {
  const { langCode, langName, langCustom } = React.use(searchParams);
  const { topicId: tipicIdRaw } = React.use(params);
  const topicId = parseInt(tipicIdRaw);
  const { topics } = useTopicsContext();
  const topic = topics.find((topic) => topic.id === topicId);
  if (!topic) {
    throw new Error('No such topic exists');
  }
  return (
    <SelectTopicLanguageModal
      langCode={langCode}
      langName={langName}
      langCustom={langCustom === 'true'}
      topicId={topicId}
    />
  );
}
