import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Wheel } from 'react-custom-roulette';
import { RouletteProps, FoodItem } from '../types/types';

const RouletteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const WheelContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const SpinButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(0, 179, 186, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #009da3;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 179, 186, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 179, 186, 0.3);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResultContainer = styled.div`
  text-align: center;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--secondary-color);
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  
  &.show {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ResultTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
`;

const ResultName = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const ResultAddress = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const MapLink = styled.a`
  display: inline-block;
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: underline;
  
  &:hover {
    color: #009da3;
  }
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin: 2rem 0;
`;

interface RouletteResultProps {
  selectedItem: FoodItem | null;
}

// 結果顯示組件
const RouletteResult: React.FC<RouletteResultProps> = ({ selectedItem }) => {
  if (!selectedItem) return null;
  
  return (
    <ResultContainer className="show">
      <ResultTitle>今天吃這個！</ResultTitle>
      <ResultName>{selectedItem.name}</ResultName>
      {selectedItem.address && (
        <ResultAddress>{selectedItem.address}</ResultAddress>
      )}
      {selectedItem.googleMapUrl && (
        <MapLink 
          href={selectedItem.googleMapUrl} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          在 Google Maps 上查看
        </MapLink>
      )}
    </ResultContainer>
  );
};

interface ExtendedRouletteProps extends RouletteProps {
  showResultInSeparateSection?: boolean;
  selectedItem?: FoodItem | null;
}

// 創建一個具有靜態屬性的組件類型
type RouletteComponentType = React.FC<ExtendedRouletteProps> & {
  Result: React.FC<RouletteResultProps>;
};

const Roulette: React.FC<ExtendedRouletteProps> = ({ 
  items, 
  onSelectItem,
  showResultInSeparateSection = false,
  selectedItem: propSelectedItem
}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(propSelectedItem || null);
  const resultRef = useRef<HTMLDivElement>(null);
  
  const wheelData = items.map(item => ({
    option: item.name,
    style: { backgroundColor: getRandomColor(), textColor: 'white' }
  }));
  
  function getRandomColor() {
    // 生成與主色調相近的隨機顏色
    const hue = Math.floor(Math.random() * 20) + 180; // 青色系 (180-200)
    const saturation = Math.floor(Math.random() * 30) + 60; // 60%-90%
    const lightness = Math.floor(Math.random() * 20) + 30; // 30%-50%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  
  const handleSpinClick = () => {
    if (!mustSpin && items.length > 0) {
      // 隨機選擇一個項目
      const newPrizeNumber = Math.floor(Math.random() * items.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      
      // 清除之前選擇的項目
      onSelectItem(null);
    }
  };
  
  const handleSpinStop = () => {
    setMustSpin(false);
    const selected = items[prizeNumber];
    setSelectedItem(selected);
    onSelectItem(selected);
    
    // 顯示結果並添加動畫效果
    setTimeout(() => {
      if (resultRef.current && !showResultInSeparateSection) {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };
  
  return (
    <RouletteWrapper>
      {items.length > 0 ? (
        <>
          <WheelContainer>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={wheelData}
              onStopSpinning={handleSpinStop}
              backgroundColors={['#3e3e3e', '#df3428']}
              textColors={['#ffffff']}
              outerBorderColor="#f5f5f5"
              outerBorderWidth={2}
              innerBorderColor="#f5f5f5"
              innerBorderWidth={5}
              radiusLineColor="#f5f5f5"
              radiusLineWidth={2}
              fontSize={14}
              perpendicularText={false}
              textDistance={60}
              spinDuration={0.7}
              startingOptionIndex={0}
            />
          </WheelContainer>
          
          <SpinButton 
            onClick={handleSpinClick} 
            disabled={mustSpin || items.length === 0}
          >
            {mustSpin ? '轉動中...' : '開始轉動'}
          </SpinButton>
          
          {!showResultInSeparateSection && selectedItem && (
            <div ref={resultRef}>
              <RouletteResult selectedItem={selectedItem} />
            </div>
          )}
        </>
      ) : (
        <EmptyMessage>
          請先添加美食項目到轉盤中
        </EmptyMessage>
      )}
    </RouletteWrapper>
  );
};

// 將結果組件附加到 Roulette 上
const RouletteWithResult = Roulette as RouletteComponentType;
RouletteWithResult.Result = RouletteResult;

export default RouletteWithResult; 