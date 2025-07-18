'use client';

import React from 'react';

import { SelectLanguageModal } from '@/components/pages/MyTopicsPage/SelectLanguageModal';
import { useTopicsContext } from '@/contexts/TopicsContext';

interface SelectLanguagePageProps {
  params: Promise<{
    topicId: string;
  }>;
  searchParams: Promise<{
    langCode?: string;
    langName?: string;
    langCustom?: string;
  }>;
}

export default function SelectLanguagePage({ params, searchParams }: SelectLanguagePageProps) {
  const { langCode, langName, langCustom } = React.use(searchParams);
  const { topicId: tipicIdRaw } = React.use(params);
  const topicId = parseInt(tipicIdRaw);
  const { topics } = useTopicsContext();
  const topic = topics.find((topic) => topic.id === topicId);
  if (!topic) {
    throw new Error('No such topic exists');
  }
  return (
    <SelectLanguageModal
      langCode={langCode}
      langName={langName}
      langCustom={langCustom === 'true'}
      topicId={topicId}
    />
  );
}
