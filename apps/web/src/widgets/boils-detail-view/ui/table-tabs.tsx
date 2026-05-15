import {
  Badge,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';
import type { TBoilDetailResponse } from '@repo/schemas';
import { SummaryTable } from './summary-table';
import { useState } from 'react';
import { TechCardTable } from './techcard-table';
import { LoadTable } from './load-table';
import { WeightingTable } from './weighting-table';
import { useAuth } from '@/app/providers';
import { AllXLSXButton, WeightingXLSXButton } from '@/features/weighting-xlsx';

export function TableTabs({
  data,
  isFetching,
  isPlaceholderData,
}: {
  data: TBoilDetailResponse;
  isFetching: boolean;
  isPlaceholderData: boolean;
}) {
  const [activeTab, setActiveTab] = useState('summary');
  const { user } = useAuth();
  const allowedRole = 'Технолог';
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between  ">
        <Label htmlFor="view-selector" className="sr-only">
          Таблицы
        </Label>
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="summary">Общая сводка</SelectItem>
              <SelectItem value="weightings">Взвешивания</SelectItem>
              <SelectItem value="loads">Загрузки</SelectItem>
              {user?.roles.includes(allowedRole) && (
                <SelectItem value="tech-card">Технологическая карта</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="summary">Общая сводка</TabsTrigger>
          <TabsTrigger value="weightings">
            Взвешивания <Badge variant="secondary">{data?.weightings?.length ?? 0}</Badge>
          </TabsTrigger>
          <TabsTrigger value="loads">
            Загрузки <Badge variant="secondary">{data?.loads?.length ?? 0}</Badge>
          </TabsTrigger>
          {user?.roles.includes(allowedRole) && (
            <TabsTrigger value="tech-card">
              Технологическая карта <Badge variant="secondary">{data?.techCard?.length ?? 0}</Badge>
            </TabsTrigger>
          )}
        </TabsList>
        {user?.roles.includes(allowedRole) && activeTab === 'weightings' && (
          <WeightingXLSXButton data={data} />
        )}
        {user?.roles.includes(allowedRole) && activeTab === 'summary' && (
          <AllXLSXButton data={data} />
        )}
      </div>
      <TabsContent value="summary" className="flex flex-col gap-4 overflow-auto ">
        <SummaryTable
          data={data?.summary}
          isFetching={isFetching}
          isPlaceholderData={isPlaceholderData}
        />
      </TabsContent>
      <TabsContent value="weightings" className="flex flex-col gap-4 overflow-auto ">
        <WeightingTable
          data={data?.weightings}
          isFetching={isFetching}
          isPlaceholderData={isPlaceholderData}
        />
      </TabsContent>
      <TabsContent value="loads" className="flex flex-col gap-4 overflow-auto ">
        <LoadTable
          data={data?.loads}
          isFetching={isFetching}
          isPlaceholderData={isPlaceholderData}
        />
      </TabsContent>
      {user?.roles.includes(allowedRole) && (
        <TabsContent value="tech-card" className="flex flex-col gap-4 overflow-auto ">
          <TechCardTable
            data={data?.techCard}
            isFetching={isFetching}
            isPlaceholderData={isPlaceholderData}
          />
        </TabsContent>
      )}
    </Tabs>
  );
}
