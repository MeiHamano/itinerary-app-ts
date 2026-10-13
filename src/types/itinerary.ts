export type CategoryType = 'meal' | 'activity' | 'shopping' | 'move' | 'other';
export type MoveMethodType = 'walk' | 'train' | 'bus' | 'car' | 'airplane' | 'other';

// 日付区切りの基本情報（DateDividerRow コンポーネント用の型）
export interface DateDivider {
  id: string;
  type: 'divider';
  date: string; // 'YYYY-MM-DD' または ''
}

// 予定アイテムの型
export interface ItineraryItem {
  id: string;
  type: 'item';
  category: CategoryType;
  startTime: string;
  endTime: string;
  place?: string;
  url?: string;
  notes?: string;
  moveMethod?: MoveMethodType;
  moveMethodCustom?: string;
}

// ★　1日分のデータ構成（日付情報 ＋ 予定の配列）
export interface DaySchedule {
  //日付
  id: string;
  type: 'divider'; //区切り
  date: string; //日付
  items: ItineraryItem[]; //予定
}

// フラット配列を使っていた旧互換用（必要に応じて残すか削除可能）
export type TimelineEntry = DaySchedule | ItineraryItem;

export const CATEGORY_OPTIONS: { value: CategoryType; label: string }[] = [
  { value: 'meal', label: '食事' },
  { value: 'activity', label: '観光・体験' },
  { value: 'shopping', label: '買い物' },
  { value: 'move', label: '移動' },
  { value: 'other', label: 'その他' },
];

export const MOVE_METHOD_OPTIONS: { value: MoveMethodType; label: string }[] = [
  { value: 'walk', label: '徒歩' },
  { value: 'train', label: '電車・地下鉄' },
  { value: 'bus', label: 'バス' },
  { value: 'car', label: '車・タクシー' },
  { value: 'airplane', label: '飛行機' },
  { value: 'other', label: 'その他' },
];

// ID 生成のユーティリティ関数
const generateId = (): string =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// 予定アイテムの初期生成関数
export const createEmptyItineraryItem = (category: CategoryType = 'meal'): ItineraryItem => ({
  id: generateId(),
  type: 'item',
  category,
  startTime: '',
  endTime: '',
  place: '',
  url: '',
  notes: '',
  moveMethod: 'train',
  moveMethodCustom: '',
});

// 日付区切りの初期生成関数（単体用）
export const createEmptyDateDivider = (): DateDivider => ({
  id: generateId(),
  type: 'divider',
  date: '',
});

// 1日分のスケジュールの初期生成関数
export const createEmptyDaySchedule = (date = ''): DaySchedule => ({
  id: generateId(),
  type: 'divider',
  date,
  items: [createEmptyItineraryItem()],
});