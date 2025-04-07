export const translations = {
    en: {
      // Header
      'app.title': 'Cheque OCR Dashboard',
      'nav.home': 'Home',
      'nav.cheques': 'Cheques',
      'nav.dashboard': 'Dashboard',
      'api.status': 'API Status:',
      
      // HomePage
      'home.title': 'Cheque OCR System',
      'home.description': 'Upload cheque images for automated processing and data extraction. Each image will be analyzed to extract cheque details including amount, date, payee, and signature.',
      
      // UploadForm
      'upload.title': 'Upload Cheque',
      'upload.drag': 'Drag & drop cheque image here, or click to select',
      'upload.selected': 'Selected',
      'upload.files': 'files',
      'upload.button': 'Upload Cheque',
      'upload.uploading': 'Uploading...',
      'upload.error.empty': 'Please select a file to upload.',
      'upload.success': 'Cheque uploaded successfully! Cheque ID: ',
      
      // ChequesPage
      'cheques.title': 'Processed Cheques',
      'cheques.button.upload': 'Upload New Cheque',
      'cheques.empty': 'No cheques found.',
      
      // ChequesList
      'cheques.list.title': 'Recent Cheques',
      'cheques.list.id': 'ID',
      'cheques.list.filename': 'Filename',
      'cheques.list.bank': 'Bank',
      'cheques.list.payee': 'Payee',
      'cheques.list.amount': 'Amount',
      'cheques.list.date': 'Date',
      'cheques.list.actions': 'Actions',
      'cheques.list.view': 'View',
      
      // ChequeDetails
      'cheque.title': 'Cheque Details',
      'cheque.back': 'Back to Cheques',
      'cheque.id': 'Cheque ID',
      'cheque.processed': 'Processed',
      'cheque.bank': 'Bank',
      'cheque.payee': 'Payee',
      'cheque.date': 'Date',
      'cheque.amount.num': 'Amount (Numerical)',
      'cheque.amount.words': 'Amount (Words)',
      'cheque.account.number': 'Account Number',
      'cheque.routing.number': 'Routing Number',
      'cheque.cheque.number': 'Cheque Number',
      'cheque.micr': 'MICR Line',
      'cheque.signature': 'Signature',
      'cheque.memo': 'Memo',
      'cheque.view.original': 'View Original',
      'cheque.view.signature': 'View Signature',
      
      // Dashboard
      'dashboard.title': 'Dashboard',
      'dashboard.stats.total': 'Total Cheques',
      'dashboard.stats.today': 'Today',
      'dashboard.stats.week': 'This Week',
      'dashboard.stats.month': 'This Month',
      'dashboard.chart.bank': 'Bank Distribution',
      'dashboard.chart.amounts': 'Amount Distribution',
      'dashboard.chart.time': 'Processing Times',
      
      // Footer
      'footer.copyright': 'Cheque OCR Dashboard ©',
      
      // Theme Toggle
      'theme.toggle': 'Toggle Theme',
      'theme.light': 'Light',
      'theme.dark': 'Dark',
      
      // Language Toggle
      'language.toggle': 'भाषा बदलें (Change Language)',
      'language.en': 'English',
      'language.hi': 'हिन्दी',
      
      // Not Found Page
      '404.title': '404',
      '404.message': "The page you're looking for doesn't exist.",
      '404.button': 'Return Home',
      
      // Confidence Levels
      'confidence.high': 'High',
      'confidence.medium': 'Medium',
      'confidence.low': 'Low'
    },
    hi: {
      // Header
      'app.title': 'चेक OCR डैशबोर्ड',
      'nav.home': 'होम',
      'nav.cheques': 'चेक्स',
      'nav.dashboard': 'डैशबोर्ड',
      'api.status': 'API स्थिति:',
      
      // HomePage
      'home.title': 'चेक OCR सिस्टम',
      'home.description': 'स्वचालित प्रसंस्करण और डेटा निष्कर्षण के लिए चेक छवियां अपलोड करें। प्रत्येक छवि का विश्लेषण राशि, तिथि, आदाता और हस्ताक्षर सहित चेक विवरण निकालने के लिए किया जाएगा।',
      
      // UploadForm
      'upload.title': 'चेक अपलोड करें',
      'upload.drag': 'चेक छवि यहां खींचें और छोड़ें, या चुनने के लिए क्लिक करें',
      'upload.selected': 'चयनित',
      'upload.files': 'फ़ाइलें',
      'upload.button': 'चेक अपलोड करें',
      'upload.uploading': 'अपलोड हो रहा है...',
      'upload.error.empty': 'कृपया अपलोड करने के लिए एक फ़ाइल का चयन करें।',
      'upload.success': 'चेक सफलतापूर्वक अपलोड किया गया! चेक आईडी: ',
      
      // ChequesPage
      'cheques.title': 'संसाधित चेक्स',
      'cheques.button.upload': 'नया चेक अपलोड करें',
      'cheques.empty': 'कोई चेक नहीं मिला।',
      
      // ChequesList
      'cheques.list.title': 'हाल के चेक्स',
      'cheques.list.id': 'आईडी',
      'cheques.list.filename': 'फ़ाइल नाम',
      'cheques.list.bank': 'बैंक',
      'cheques.list.payee': 'आदाता',
      'cheques.list.amount': 'राशि',
      'cheques.list.date': 'तिथि',
      'cheques.list.actions': 'कार्रवाई',
      'cheques.list.view': 'देखें',
      
      // ChequeDetails
      'cheque.title': 'चेक विवरण',
      'cheque.back': 'चेक्स पर वापस जाएं',
      'cheque.id': 'चेक आईडी',
      'cheque.processed': 'संसाधित',
      'cheque.bank': 'बैंक',
      'cheque.payee': 'आदाता',
      'cheque.date': 'तिथि',
      'cheque.amount.num': 'राशि (संख्यात्मक)',
      'cheque.amount.words': 'राशि (शब्दों में)',
      'cheque.account.number': 'खाता संख्या',
      'cheque.routing.number': 'राउटिंग नंबर',
      'cheque.cheque.number': 'चेक नंबर',
      'cheque.micr': 'MICR लाइन',
      'cheque.signature': 'हस्ताक्षर',
      'cheque.memo': 'मेमो',
      'cheque.view.original': 'मूल देखें',
      'cheque.view.signature': 'हस्ताक्षर देखें',
      
      // Dashboard
      'dashboard.title': 'डैशबोर्ड',
      'dashboard.stats.total': 'कुल चेक्स',
      'dashboard.stats.today': 'आज',
      'dashboard.stats.week': 'इस सप्ताह',
      'dashboard.stats.month': 'इस महीने',
      'dashboard.chart.bank': 'बैंक वितरण',
      'dashboard.chart.amounts': 'राशि वितरण',
      'dashboard.chart.time': 'प्रसंस्करण समय',
      
      // Footer
      'footer.copyright': 'चेक OCR डैशबोर्ड ©',
      
      // Theme Toggle
      'theme.toggle': 'थीम बदलें',
      'theme.light': 'लाइट',
      'theme.dark': 'डार्क',
      
      // Language Toggle
      'language.toggle': 'Change Language (भाषा बदलें)',
      'language.en': 'English',
      'language.hi': 'हिन्दी',
      
      // Not Found Page
      '404.title': '404',
      '404.message': "आप जिस पेज की तलाश कर रहे हैं वह मौजूद नहीं है।",
      '404.button': 'होम पर वापस जाएं',
      
      // Confidence Levels
      'confidence.high': 'उच्च',
      'confidence.medium': 'मध्यम',
      'confidence.low': 'निम्न'
    }
  };