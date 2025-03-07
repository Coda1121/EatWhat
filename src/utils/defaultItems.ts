import { FoodItem } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

export const defaultItems: FoodItem[] = [
  {
    id: uuidv4(),
    name: '蒸心手工小籠湯包',
    address: '407台中市西屯區長安路二段125號',
    googleMapUrl: 'https://maps.app.goo.gl/gLMyotW1owgMcjRj7'
  },
  {
    id: uuidv4(),
    name: '王爺王肉羹',
    address: '406台中市北屯區中平路570號',
    googleMapUrl: 'https://maps.app.goo.gl/d89mNZ1FdbG7F5KZ7'
  },
  {
    id: uuidv4(),
    name: '一生懸命 丼飯（水湳總店）',
    address: '407台中市長安路二段180號中清西二街長安路上轉角處紅茶冰對面',
    googleMapUrl: 'https://maps.app.goo.gl/dtRtKPhhh8rQL2FR7'
  },
  {
    id: uuidv4(),
    name: '胖老闆早午餐',
    googleMapUrl: 'https://maps.app.goo.gl/7htrUGzFc54WjZwK7'
  },
  {
    id: uuidv4(),
    name: 'くら寿司 藏壽司 台中中清路店',
    address: '406台中市北屯區中清路二段777號',
    googleMapUrl: 'https://maps.app.goo.gl/7TXeTj2aRY8io3Bt8'
  }
]; 