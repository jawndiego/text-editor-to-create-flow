import { ConnectKitButton } from 'connectkit'
import { Caisson } from './Caisson'
import { CustomButton } from './customButton'
import styled from "styled-components";
import { useState } from 'react';

interface HeaderProps {
  onConnectionChange?: (connected: boolean) => void; 
}

export const Header: React.FC<HeaderProps> = ({onConnectionChange}) => {

  return (
    <div className="flex justify-between items-center p-4">
      <Caisson />
      <div className="flex items-center gap-8">
        <CustomButton onConnectionChange={onConnectionChange} />
      </div>
    </div>
  )
}
