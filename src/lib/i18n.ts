export type Language = 'en' | 'ko';

export const translations = {
    en: {
        nav: {
            dashboard: 'Dashboard',
            contacts: 'Address Book',
            writer: 'AI Writer',
            create: 'Creative Studio',
            send: 'Mass Sender',
        },
        dashboard: {
            welcome: 'Welcome back, Creator',
            subtitle: "Here's what's happening with your campaigns today.",
            stats: {
                totalContacts: 'Total Contacts',
                emailsSent: 'Emails Sent',
                openRate: 'Open Rate',
            },
            activity: {
                title: 'Recent Activity',
                sample: 'Generated "Winter Promo" campaign',
                time: '2 hours ago',
            },
            actions: {
                title: 'Quick Actions',
                newCampaign: 'New Campaign',
                addContacts: 'Add Contacts',
            },
        },
        contacts: {
            title: 'Address Book',
            subtitle: 'Import and manage your VIP contact list.',
            upload: {
                title: 'Upload Contacts',
                desc: 'Drag & drop Excel or CSV file here, or click to browse',
                processing: 'Processing...',
            },
            table: {
                name: 'Name',
                email: 'Email',
                company: 'Company',
                role: 'Role',
                showing: 'Showing',
                contacts: 'contacts',
            },
            imported: 'Imported Contacts',
            clear: 'Clear All',
        },
        writer: {
            title: 'AI Writer',
            subtitle: 'Craft the perfect message with magic.',
            labels: {
                subject: 'Subject',
                context: 'Key Points / Context',
                tone: 'Tone',
            },
            placeholders: {
                subject: 'e.g. Q1 Partnership Update',
                context: 'What specific details should be included?',
            },
            tones: {
                professional: 'Professional',
                friendly: 'Friendly',
                magical: 'Magical',
            },
            button: {
                generate: 'Generate Draft',
                generating: 'Parsing magic...',
            },
            output: {
                title: 'Generated Draft',
                placeholder: 'Your magic content will appear here...',
                ready: 'Ready to generate',
            },
        },
        create: {
            title: 'Creative Studio',
            subtitle: 'Transform your message into diverse formats.',
            selectTarget: 'Select Target',
            tabs: {
                pdf: 'PDF Document',
                animation: 'Animation',
                web: 'Web Page',
            },
            preview: {
                select: 'Select a contact from the left to start creating.',
                download: 'Download PDF',
                invite: 'Exclusive Invite',
                unlock: 'Unlock Experience',
                welcome: 'Welcome',
                landing: 'We have created a personal landing page just for you.',
                check: 'Check Offer',
                live: 'Preview Live',
            },
        },
        send: {
            recipients: 'Recipients',
            selected: 'selected',
            subject: 'Subject Line',
            content: 'Email Content',
            button: {
                send: 'Send Campaign',
                sending: 'Sending Magic...',
            },
            success: {
                title: 'Campaign Sent!',
                desc: 'Your magic has been delivered to',
                more: 'Send Another',
            },
        },
    },
    ko: {
        nav: {
            dashboard: '대시보드',
            contacts: '주소록',
            writer: 'AI 작가',
            create: '크리에이티브 스튜디오',
            send: '대량 발송',
        },
        dashboard: {
            welcome: '환영합니다, 크리에이터님',
            subtitle: "오늘의 캠페인 현황을 확인하세요.",
            stats: {
                totalContacts: '총 연락처',
                emailsSent: '발송된 이메일',
                openRate: '오픈율',
            },
            activity: {
                title: '최근 활동',
                sample: '"겨울 프로모션" 캠페인 생성',
                time: '2시간 전',
            },
            actions: {
                title: '빠른 작업',
                newCampaign: '새 캠페인',
                addContacts: '연락처 추가',
            },
        },
        contacts: {
            title: '주소록',
            subtitle: 'VIP 연락처 목록을 관리하세요.',
            upload: {
                title: '연락처 업로드',
                desc: 'Excel 또는 CSV 파일을 드래그하거나 클릭하여 업로드하세요',
                processing: '처리 중...',
            },
            table: {
                name: '이름',
                email: '이메일',
                company: '회사',
                role: '직책',
                showing: '총',
                contacts: '개의 연락처',
            },
            imported: '가져온 연락처',
            clear: '전체 삭제',
        },
        writer: {
            title: 'AI 작가',
            subtitle: '마법 같은 메시지를 작성해보세요.',
            labels: {
                subject: '제목',
                context: '핵심 포인트 / 문맥',
                tone: '톤앤매너',
            },
            placeholders: {
                subject: '예: 1분기 파트너십 업데이트',
                context: '어떤 구체적인 내용이 포함되어야 하나요?',
            },
            tones: {
                professional: '전문적인',
                friendly: '친근한',
                magical: '매직',
            },
            button: {
                generate: '초안 생성',
                generating: '마법을 부리는 중...',
            },
            output: {
                title: '생성된 초안',
                placeholder: '이곳에 마법 같은 내용이 나타납니다...',
                ready: '생성 준비 완료',
            },
        },
        create: {
            title: '크리에이티브 스튜디오',
            subtitle: '메시지를 다양한 포맷으로 변환하세요.',
            selectTarget: '대상 선택',
            tabs: {
                pdf: 'PDF 문서',
                animation: '애니메이션',
                web: '웹 페이지',
            },
            preview: {
                select: '왼쪽에서 연락처를 선택하여 시작하세요.',
                download: 'PDF 다운로드',
                invite: '특별 초대',
                unlock: '경험 잠금 해제',
                welcome: '환영합니다',
                landing: '당신만을 위한 개인화된 랜딩 페이지입니다.',
                check: '혜택 확인',
                live: '라이브 미리보기',
            },
        },
        send: {
            recipients: '수신자',
            selected: '명 선택됨',
            subject: '이메일 제목',
            content: '이메일 내용',
            button: {
                send: '캠페인 발송',
                sending: '마법 전송 중...',
            },
            success: {
                title: '캠페인 발송 완료!',
                desc: '다음 수신자들에게 마법이 배달되었습니다:',
                more: '다른 메일 보내기',
            },
        },
    },
};
