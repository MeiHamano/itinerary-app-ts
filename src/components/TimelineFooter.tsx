import React from 'react';
import { Box, Button, Divider } from '@mui/material';
import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';

interface TimelineFooterProps {
  onAddDivider: () => void;
}

//画面最下部に仕切り線（Divider）と「次の日付を追加」ボタンを配置
const TimelineFooter: React.FC<TimelineFooterProps> = ({ onAddDivider }) => {
  return (
    <Box sx={{ mt: 4, mb: 6, textAlign: 'center' }}>
      <Divider sx={{ mb: 3 }} />
      {/* 次の日程枠を追加するメインボタン */}
      <Button
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<CalendarMonthIcon />}
        onClick={onAddDivider}
        sx={{
          px: 4,
          py: 1.2,
          fontWeight: 'bold',
          borderRadius: 2,
          borderWidth: 2,
          '&:hover': { borderWidth: 2 },
        }}
      >
        ＋ 次の日付（区切り）を追加
      </Button>
    </Box>
  );
};

export default React.memo(TimelineFooter);