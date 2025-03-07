import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { ItemFormProps, FoodItem } from '../types/types';

const FormContainer = styled.div`
  width: 100%;
  padding: 1.5rem;
  background-color: var(--secondary-color);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 179, 186, 0.2);
  }
  
  &.error {
    border-color: #e74c3c;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const SubmitButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  
  &:hover {
    background-color: #009da3;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  color: #666;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ItemsList = styled.div`
  margin-top: 2rem;
`;

const ItemsListTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const ItemCard = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
`;

const ItemName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const ItemAddress = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f5f5f5;
    color: var(--primary-color);
  }
`;

const MapButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  margin-left: auto;
  
  &:hover {
    background-color: #009da3;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ItemForm: React.FC<ItemFormProps> = ({
  items,
  onAddItem,
  onEditItem,
  onDeleteItem,
  selectedItem
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [googleMapUrl, setGoogleMapUrl] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    googleMapUrl: ''
  });
  
  // 定義 handleEdit 函數
  const handleEdit = useCallback((index: number) => {
    const item = items[index];
    setName(item.name);
    setAddress(item.address || '');
    setGoogleMapUrl(item.googleMapUrl || '');
    setEditIndex(index);
  }, [items]);
  
  // 當選擇項目變更時，填充表單
  useEffect(() => {
    if (selectedItem) {
      const index = items.findIndex(item => item.id === selectedItem.id);
      if (index !== -1) {
        handleEdit(index);
      }
    }
  }, [selectedItem, items, handleEdit]);
  
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      googleMapUrl: ''
    };
    
    if (!name.trim()) {
      newErrors.name = '美食名稱為必填項目';
      valid = false;
    }
    
    if (googleMapUrl && !isValidUrl(googleMapUrl)) {
      newErrors.googleMapUrl = '請輸入有效的 URL';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const item: FoodItem = {
      id: editIndex !== null ? items[editIndex].id : uuidv4(),
      name: name.trim(),
      address: address.trim() || undefined,
      googleMapUrl: googleMapUrl.trim() || undefined
    };
    
    if (editIndex !== null) {
      onEditItem(editIndex, item);
      setEditIndex(null);
    } else {
      onAddItem(item);
    }
    
    resetForm();
  };
  
  const handleCancel = () => {
    resetForm();
  };
  
  const resetForm = () => {
    setName('');
    setAddress('');
    setGoogleMapUrl('');
    setEditIndex(null);
    setErrors({
      name: '',
      googleMapUrl: ''
    });
  };
  
  return (
    <FormContainer>
      <FormTitle>{editIndex !== null ? '編輯美食項目' : '新增美食項目'}</FormTitle>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">美食名稱 *</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="address">店家地址</Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="googleMapUrl">Google Map 連結</Label>
          <Input
            id="googleMapUrl"
            type="text"
            value={googleMapUrl}
            onChange={(e) => setGoogleMapUrl(e.target.value)}
            className={errors.googleMapUrl ? 'error' : ''}
          />
          {errors.googleMapUrl && <ErrorMessage>{errors.googleMapUrl}</ErrorMessage>}
        </FormGroup>
        
        <ButtonGroup>
          <SubmitButton type="submit">
            {editIndex !== null ? '更新' : '新增'}
          </SubmitButton>
          {editIndex !== null && (
            <CancelButton type="button" onClick={handleCancel}>
              取消
            </CancelButton>
          )}
        </ButtonGroup>
      </Form>
      
      {items.length > 0 && (
        <ItemsList>
          <ItemsListTitle>已新增項目 ({items.length})</ItemsListTitle>
          
          {items.map((item, index) => (
            <ItemCard key={item.id}>
              <ItemName>{item.name}</ItemName>
              {item.address && <ItemAddress>{item.address}</ItemAddress>}
              
              <ItemActions>
                <ActionButton onClick={() => handleEdit(index)}>
                  編輯
                </ActionButton>
                <ActionButton onClick={() => onDeleteItem(index)}>
                  刪除
                </ActionButton>
                
                {item.googleMapUrl && (
                  <MapButton 
                    href={item.googleMapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    在 Google Maps 上查看
                  </MapButton>
                )}
              </ItemActions>
            </ItemCard>
          ))}
        </ItemsList>
      )}
    </FormContainer>
  );
};

export default ItemForm; 