import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Roulette from './components/Roulette';
import ItemForm from './components/ItemForm';
import { FoodItem } from './types/types';
import { defaultItems } from './utils/defaultItems';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const ModeToggle = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const ModeButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--primary-color);
  background-color: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--primary-color)'};
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : '#e6f7f8'};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const RouletteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const WheelSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
`;

const App: React.FC = () => {
  const [isDefaultMode, setIsDefaultMode] = useState<boolean>(true);
  const [items, setItems] = useState<FoodItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  
  // 初始化項目列表
  useEffect(() => {
    if (isDefaultMode) {
      setItems(defaultItems);
    } else {
      // 從 localStorage 讀取自定義項目
      const savedItems = localStorage.getItem('customItems');
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      } else {
        setItems([]);
      }
    }
  }, [isDefaultMode]);
  
  // 保存自定義項目到 localStorage
  useEffect(() => {
    if (!isDefaultMode) {
      localStorage.setItem('customItems', JSON.stringify(items));
    }
  }, [items, isDefaultMode]);
  
  // 頁面離開警告
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDefaultMode && items.length > 0) {
        e.preventDefault();
        e.returnValue = '注意：離開頁面後，您自行新增的項目將會被清空。是否確定離開？';
        return e.returnValue;
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDefaultMode, items]);
  
  const handleAddItem = (item: FoodItem) => {
    setItems(prevItems => [...prevItems, item]);
  };
  
  const handleEditItem = (index: number, updatedItem: FoodItem) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = updatedItem;
      return newItems;
    });
  };
  
  const handleDeleteItem = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };
  
  const handleModeToggle = (mode: boolean) => {
    if (!isDefaultMode && mode && items.length > 0) {
      if (window.confirm('切換到預設模式將會清空您自行新增的項目。是否確定切換？')) {
        setIsDefaultMode(mode);
      }
    } else {
      setIsDefaultMode(mode);
    }
  };

  return (
    <AppContainer>
      <Header>
        <Title>EatWhat?</Title>
        <Subtitle>水湳美食轉盤 - 不知道吃什麼？讓轉盤來決定！</Subtitle>
      </Header>
      
      <ModeToggle>
        <ModeButton 
          active={isDefaultMode} 
          onClick={() => handleModeToggle(true)}
        >
          預設版本
        </ModeButton>
        <ModeButton 
          active={!isDefaultMode} 
          onClick={() => handleModeToggle(false)}
        >
          自訂版本
        </ModeButton>
      </ModeToggle>
      
      <ContentContainer>
        <RouletteContainer>
          <WheelSection>
            <Roulette 
              items={items} 
              onSelectItem={setSelectedItem} 
              selectedItem={selectedItem}
              showResultInSeparateSection={true}
            />
          </WheelSection>
          
          <ResultSection>
            {selectedItem && (
              <Roulette.Result 
                selectedItem={selectedItem} 
              />
            )}
          </ResultSection>
        </RouletteContainer>
        
        <FormContainer>
          <ItemForm 
            items={items}
            onAddItem={handleAddItem}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            selectedItem={selectedItem}
          />
        </FormContainer>
      </ContentContainer>
    </AppContainer>
  );
};

export default App; 