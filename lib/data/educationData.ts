import { EducationLevelId } from '@/lib/constants/config';
import { Subject, Chapter, QuizQuestion } from '@/types';

// Helper to generate standardized 8 chapters for any subject
function createEightChapters(
  subjectSlug: string,
  subjectName: string,
  chapterTopics: { title: string; subtitle: string; summary: string; tips: string[] }[],
  questionBank: QuizQuestion[][]
): Chapter[] {
  return Array.from({ length: 8 }).map((_, idx) => {
    const chapterNum = idx + 1;
    const topic = chapterTopics[idx] || {
      title: `Konsep Terapan & Analisis Bab ${chapterNum}`,
      subtitle: `Pendalaman materi dan studi kasus bab ${chapterNum}`,
      summary: `Materi pembelajaran mendalam mengenai penguasaan prinsip dasar dan pemecahan masalah di bidang ${subjectName}.`,
      tips: [
        'Pahami definisi dan variabel kunci sebelum masuk ke rumus.',
        'Buat rangkuman visual dan uji daya ingatmu dengan latihan mandiri.',
        'Evaluasi setiap kesalahan pada sesi kuis untuk memperkuat pemahaman.'
      ]
    };

    const questions = questionBank[idx] || [
      {
        id: `${subjectSlug}-c${chapterNum}-q1`,
        question: `Apakah fungsi utama dari konsep yang dipelajari pada ${topic.title}?`,
        options: [
          'Mempermudah pemetaan dan pemecahan model masalah secara logis',
          'Hanya sebagai hafalan istilah teoritis tanpa kegunaan praktis',
          'Menggantikan seluruh kaidah hukum ilmiah yang telah ada',
          'Mengabaikan data kuantitatif dalam pengujian'
        ],
        correctAnswer: 0,
        explanation: 'Konsep ini dirancang untuk mempermudah abstraksi, pemetaan variabel, dan penyelesaian masalah logis secara sistematis.'
      },
      {
        id: `${subjectSlug}-c${chapterNum}-q2`,
        question: `Langkah awal yang paling tepat saat menganalisis studi kasus pada bab ini adalah...`,
        options: [
          'Langsung menarik kesimpulan akhir tanpa observasi',
          'Mengidentifikasi parameter yang diketahui dan tujuan luaran',
          'Menebak rumus yang terlihat paling kompleks',
          'Mengabaikan satuan dan batasan konteks'
        ],
        correctAnswer: 1,
        explanation: 'Identifikasi parameter input, konstanta, dan target luaran adalah fondasi analisis ilmiah yang akurat.'
      },
      {
        id: `${subjectSlug}-c${chapterNum}-q3`,
        question: `Manakah dari pernyataan berikut yang paling tepat menggambarkan prinsip kerja materi ini?`,
        options: [
          'Setiap tindakan atau perubahan nilai akan menghasilkan dampak proporsional sesuai kaidah sistem',
          'Sistem beroperasi secara acak tanpa aturan yang dapat diprediksi',
          'Hanya berlaku pada kondisi ekstrim tanpa relevansi dunia nyata',
          'Variabel independen tidak memiliki korelasi dengan hasil akhir'
        ],
        correctAnswer: 0,
        explanation: 'Prinsip utama materi ini berakar pada hukum relasi sebab-akibat yang terukur dan proporsional.'
      },
      {
        id: `${subjectSlug}-c${chapterNum}-q4`,
        question: `Bagaimana cara terbaik menguji validitas hasil perhitungan atau analisis?`,
        options: [
          'Melakukan verifikasi silang (cross-check) dan uji batas (boundary testing)',
          'Mempercayai tebakan pertama tanpa pembuktian',
          'Menghapus langkah kerja yang tidak sesuai',
          'Mengubah angka soal agar cocok dengan jawaban'
        ],
        correctAnswer: 0,
        explanation: 'Uji batas dan substitusi balik ke kondisi awal adalah metode paling reliabel untuk memverifikasi kebenaran hasil.'
      },
      {
        id: `${subjectSlug}-c${chapterNum}-q5`,
        question: `Karakteristik utama dari solusi yang optimal dalam materi ${topic.title} adalah...`,
        options: [
          'Efisien, terukur, dan dapat direplikasi secara konsisten',
          'Membutuhkan langkah yang tidak terstruktur',
          'Hanya dapat dipahami oleh satu orang',
          'Bergantung pada faktor keberuntungan'
        ],
        correctAnswer: 0,
        explanation: 'Solusi optimal selalu mengedepankan efisiensi langkah kerja, kejelasan logika, dan replikabilitas yang konsisten.'
      }
    ];

    return {
      id: `${subjectSlug}-bab-${chapterNum}`,
      chapterNumber: chapterNum,
      title: topic.title,
      subtitle: topic.subtitle,
      summary: topic.summary,
      readingDurationMinutes: 8 + (chapterNum * 2),
      keyPoints: topic.tips,
      sampleQuestions: questions
    };
  });
}

// ----------------------------------------------------
// SMA CURRICULUM SUBJECTS (Default)
// ----------------------------------------------------
const SMA_SUBJECTS: Subject[] = [
  {
    id: 'sma-matematika',
    educationLevel: 'SMA',
    name: 'Matematika',
    slug: 'matematika',
    category: 'Sains & Eksakta',
    color: '#E9D9FF', // Soft lavender
    iconName: 'Calculator',
    description: 'Kuasai konsep aljabar, kalkulus, trigonometri, dan geometri dengan latihan terarah.',
    chapters: createEightChapters(
      'sma-matematika',
      'Matematika',
      [
        {
          title: 'Persamaan & Pertidaksamaan Linear',
          subtitle: 'Nilai mutlak satu variabel dan sistem persamaan linear tiga variabel',
          summary: 'Bab ini membahas prinsip persamaan linear, manipulasi aljabar nilai mutlak, serta metode eliminasi-substitusi pada sistem SPLTV dalam konteks pemecahan masalah nyata.',
          tips: ['Perhatikan sifat nilai mutlak |x| = a maka x = a atau x = -a', 'Cari variabel termudah untuk dieliminasi terlebih dahulu', 'Lakukan uji titik untuk pertidaksamaan linear']
        },
        {
          title: 'Fungsi Komposisi & Fungsi Invers',
          subtitle: 'Operasi aljabar fungsi, domain kodomain, dan sifat invers',
          summary: 'Mempelajari cara menggabungkan dua fungsi atau lebih (f o g)(x) dan mencari invers f⁻¹(x) dengan syarat fungsi harus bijektif (satu-satu dan pada).',
          tips: ['(f o g)(x) berarti substitusi g(x) ke dalam f(x)', 'Untuk mencari invers, nyatakan x dalam bentuk y lalu tukar variabel', 'Periksa daerah asal agar penyebut tidak nol atau akar tidak negatif']
        },
        {
          title: 'Trigonometri Dasar & Identitas',
          subtitle: 'Perbandingan sudut istimewa, aturan sinus & cosinus, dan grafik fungsi',
          summary: 'Fondasi sudut dalam segitiga siku-siku, lingkaran satuan, relasi sudut di berbagai kuadran, serta aplikasi aturan sinus dan cosinus pada segitiga sembarang.',
          tips: ['Ingat sin = de/mi, cos = sa/mi, tan = de/sa', 'Gunakan aturan cosinus jika diketahui dua sisi dan sudut apit', 'Identitas pythagoras utama: sin²x + cos²x = 1']
        },
        {
          title: 'Matriks & Transformasi Linear',
          subtitle: 'Operasi matriks, determinan, invers ordo 2x2 dan 3x3',
          summary: 'Konsep baris dan kolom matriks, perkalian matriks, determinan aturan Sarrus, dan invers matriks untuk menyelesaikan sistem persamaan linear.',
          tips: ['Perkalian matriks A(m x n) dan B(n x p) menghasilkan C(m x p)', 'Determinan matriks [a b; c d] adalah ad - bc', 'Invers hanya ada jika determinan ≠ 0 (matriks non-singular)']
        },
        {
          title: 'Barisan & Deret Aritmetika Geometri',
          subtitle: 'Pola bilangan, rumus suku ke-n, dan deret tak hingga konvergen',
          summary: 'Menganalisis barisan dengan beda tetap (aritmetika) atau rasio tetap (geometri), termasuk penerapan pada bunga majemuk dan peluruhan zat.',
          tips: ['Aritmetika: Un = a + (n-1)b dan Sn = n/2(2a + (n-1)b)', 'Geometri: Un = a * r^(n-1)', 'Deret geometri tak hingga konvergen jika -1 < r < 1 dengan S∞ = a / (1 - r)']
        },
        {
          title: 'Limit Fungsi Aljabar & Trigonometri',
          subtitle: 'Konsep limit mendekati nilai, pemfaktoran, dalil L\'Hopital',
          summary: 'Memahami perilaku nilai fungsi saat mendekati titik tertentu, teknik merasionalkan bentuk akar, dan penyelesaian bentuk tak tentu 0/0 atau ∞/∞.',
          tips: ['Selalu substitusi langsung dulu sebelum menerapkan metode lanjutan', 'Jika menghasilkan 0/0, faktorkan atau kalikan bentuk sekawan', 'Gunakan limit standar lim x->0 (sin x / x) = 1']
        },
        {
          title: 'Turunan Fungsi (Diferensial)',
          subtitle: 'Aturan rantai, turunan perkalian pembagian, dan garis singgung kurva',
          summary: 'Penerapan turunan untuk mencari gradien garis singgung, interval fungsi naik/turun, nilai stasioner ekstrem (maksimum/minimum), serta laju perubahan.',
          tips: ['Turunan ax^n adalah n * a * x^(n-1)', 'Aturan hasil kali (u * v)\' = u\'v + uv\'', 'Fungsi stasioner saat f\'(x) = 0']
        },
        {
          title: 'Integral Tak Tentu & Luas Daerah',
          subtitle: 'Antiturunan, teknik substitusi, dan integral tentu terapan',
          summary: 'Kebalikan dari diferensiasi, integral tak tentu menghasilkan konstanta C. Dilanjutkan dengan integral tentu untuk menghitung luas daerah di bawah kurva.',
          tips: ['Integral x^n dx = (1/(n+1)) * x^(n+1) + C untuk n ≠ -1', 'Gunakan teknik substitusi u jika ada faktor yang merupakan turunan dari fungsi lain', 'Luas daerah di antara kurva f(x) dan g(x) adalah ∫ [f(x) - g(x)] dx']
        }
      ],
      [
        // Chapter 1 Quiz Questions
        [
          {
            id: 'sma-mat-c1-q1',
            question: 'Himpunan penyelesaian dari persamaan nilai mutlak |2x - 3| = 7 adalah...',
            options: ['{-2, 5}', '{-5, 2}', '{2, 5}', '{-2, -5}'],
            correctAnswer: 0,
            explanation: '2x - 3 = 7 → 2x = 10 → x = 5. Atau 2x - 3 = -7 → 2x = -4 → x = -2. Jadi penyelesaiannya adalah {-2, 5}.'
          },
          {
            id: 'sma-mat-c1-q2',
            question: 'Jika diketahui sistem persamaan x + y = 6 dan x - y = 2, berapakah nilai x dan y?',
            options: ['x = 4, y = 2', 'x = 5, y = 1', 'x = 3, y = 3', 'x = 2, y = 4'],
            correctAnswer: 0,
            explanation: 'Dengan menjumlahkan kedua persamaan: 2x = 8 → x = 4. Substitusi x = 4 ke x + y = 6 → y = 2.'
          },
          {
            id: 'sma-mat-c1-q3',
            question: 'Pertidaksamaan |x - 4| < 3 memiliki interval solusi...',
            options: ['1 < x < 7', '-1 < x < 7', 'x < 1 atau x > 7', 'x > 7'],
            correctAnswer: 0,
            explanation: '|x - 4| < 3 setara dengan -3 < x - 4 < 3. Menambahkan 4 ke semua ruas: 1 < x < 7.'
          },
          {
            id: 'sma-mat-c1-q4',
            question: 'Tiga bilangan berurutan berjumlah 42. Bilangan terbesarnya adalah...',
            options: ['15', '14', '13', '16'],
            correctAnswer: 0,
            explanation: 'Misalkan (x-1) + x + (x+1) = 42 → 3x = 42 → x = 14. Tiga bilangan adalah 13, 14, 15. Terbesarnya adalah 15.'
          },
          {
            id: 'sma-mat-c1-q5',
            question: 'Berapakah nilai | -15 + 4 | + | 3 - 8 |?',
            options: ['16', '6', '-16', '11'],
            correctAnswer: 0,
            explanation: '|-11| + |-5| = 11 + 5 = 16.'
          }
        ],
        // Chapter 2 Quiz Questions
        [
          {
            id: 'sma-mat-c2-q1',
            question: 'Jika f(x) = 2x + 3 dan g(x) = x² - 1, tentukan (f o g)(2)!',
            options: ['9', '7', '11', '15'],
            correctAnswer: 0,
            explanation: 'g(2) = 2² - 1 = 3. Maka (f o g)(2) = f(g(2)) = f(3) = 2(3) + 3 = 9.'
          },
          {
            id: 'sma-mat-c2-q2',
            question: 'Invers dari fungsi f(x) = 3x - 6 adalah f⁻¹(x) = ...',
            options: ['(x + 6) / 3', '(x - 6) / 3', '3x + 6', '(x + 3) / 6'],
            correctAnswer: 0,
            explanation: 'y = 3x - 6 → 3x = y + 6 → x = (y + 6) / 3. Sehingga f⁻¹(x) = (x + 6) / 3.'
          },
          {
            id: 'sma-mat-c2-q3',
            question: 'Suatu fungsi memiliki invers jika dan hanya jika fungsi tersebut bersifat...',
            options: ['Bijektif (satu-satu dan pada)', 'Surjektif saja', 'Injektif saja', 'Ganjil'],
            correctAnswer: 0,
            explanation: 'Fungsi bijektif menjamin setiap elemen domain memiliki pasangan tunggal di kodomain dan sebaliknya.'
          },
          {
            id: 'sma-mat-c2-q4',
            question: 'Jika f(x) = x + 5, berapakah nilai f⁻¹(12)?',
            options: ['7', '17', '5', '60'],
            correctAnswer: 0,
            explanation: 'x + 5 = 12 → x = 7. Jadi f⁻¹(12) = 7.'
          },
          {
            id: 'sma-mat-c2-q5',
            question: 'Diketahui (g o f)(x) = 4x² + 6 dan f(x) = 2x. Bentuk g(x) adalah...',
            options: ['x² + 6', '2x² + 6', 'x² + 3', '4x + 6'],
            correctAnswer: 0,
            explanation: 'f(x) = 2x, sehingga (2x)² + 6 = 4x² + 6. Maka g(u) = u² + 6 → g(x) = x² + 6.'
          }
        ]
      ]
    )
  },
  {
    id: 'sma-fisika',
    educationLevel: 'SMA',
    name: 'Fisika',
    slug: 'fisika',
    category: 'Sains & Eksakta',
    color: '#FFD1C1', // Peach
    iconName: 'Zap',
    description: 'Pelajari mekanika gerak, dinamika Newton, termodinamika, gelombang, dan listrik magnet.',
    chapters: createEightChapters(
      'sma-fisika',
      'Fisika',
      [
        { title: 'Besaran, Satuan & Vektor', subtitle: 'Dimensi fisika, penjumlahan vektor analitis dan grafis', summary: 'Mempelajari klasifikasi besaran pokok dan turunan, analisis dimensi, serta resultan vektor dengan metode uraian sumbu x dan y.', tips: ['Gunakan rumus phytagoras untuk dua vektor tegak lurus R = √(A² + B²)', 'Uraikan vektor ke sumbu x dengan cos θ dan sumbu y dengan sin θ', 'Periksa dimensi di kedua ruas persamaan fisika'] },
        { title: 'Kinematika Gerak Lurus (GLB & GLBB)', subtitle: 'Posisi, kecepatan, percepatan, dan gerak jatuh bebas', summary: 'Analisis gerak partikel satu dimensi tanpa memperhitungkan penyebab gerak, penurunan rumus GLBB v = v0 + at dan s = v0 t + 1/2 at².', tips: ['GLB memiliki percepatan nol (kecepatan konstan)', 'Pada gerak jatuh bebas, kecepatan awal v0 = 0 dan a = g = 9.8 m/s²', 'Pada titik tertinggi gerak vertikal ke atas, kecepatan vt = 0'] },
        { title: 'Dinamika Gerak & Hukum Newton', subtitle: 'Hukum I, II, III Newton dan gaya gesek kinetik-statis', summary: 'Hukum dasar mekanika: inersia (ΣF = 0), percepatan (ΣF = m * a), dan aksi-reaksi. Dilengkapi analisis diagram benda bebas.', tips: ['Gaya normal tegak lurus terhadap bidang kontak', 'Gaya gesek statis maksimum fs = μs * N', 'Aksi dan reaksi selalu bekerja pada dua benda yang berbeda'] },
        { title: 'Usaha, Energi & Daya', subtitle: 'Teorema usaha-energi kinetik, potensial, dan hukum kekekalan mekanik', summary: 'Usaha W = F * s * cos θ, energi kinetik 1/2 mv², energi potensial mgh, serta hukum kekekalan energi mekanik Em1 = Em2 pada sistem terisolasi.', tips: ['Jika gaya tegak lurus arah perpindahan (θ = 90°), usahanya bernilai nol', 'Daya adalah laju usaha tiap satuan waktu P = W / t = F * v', 'Energi mekanik kekal bila tidak ada gaya non-konservatif (seperti gesekan)'] },
        { title: 'Momentum, Impuls & Tumbukan', subtitle: 'Hukum kekekalan momentum, koefisien restitusi tumbukan', summary: 'Impuls sebagai perubahan momentum I = Δp = F * Δt. Tumbukan lenting sempurna (e = 1), lenting sebagian (0 < e < 1), dan tidak lenting sama sekali (e = 0).', tips: ['Momentum adalah besaran vektor p = m * v', 'Pada tumbukan tidak lenting sama sekali, kedua benda bergabung setelah tumbukan', 'Total momentum sebelum tumbukan selalu sama dengan sesudah tumbukan'] },
        { title: 'Getaran Harmonis & Gelombang Mekanik', subtitle: 'Pegas, bandul sederhana, frekuensi, periode, dan cepat rambat', summary: 'Gerak bolak-balik di sekitar titik kesetimbangan, simpangan y = A sin(ωt), hukum Hooke F = -kx, dan sifat gelombang transversal/longitudinal.', tips: ['Periode bandul sederhana T = 2π √(L/g)', 'Periode pegas T = 2π √(m/k)', 'Cepat rambat gelombang v = λ * f'] },
        { title: 'Suhu, Kalor & Termodinamika', subtitle: 'Asas Black, perpindahan kalor, dan efisiensi mesin Carnot', summary: 'Kalor sensibel Q = m * c * ΔT, kalor laten Q = m * L, konduksi, konveksi, radiasi, serta hukum I dan II Termodinamika.', tips: ['Asas Black: Q_lepas = Q_terima', 'Efisiensi mesin Carnot η = 1 - (T_rendah / T_tinggi) dengan suhu mutlak Kelvin', 'Kalor mengalir secara spontan dari suhu tinggi ke suhu rendah'] },
        { title: 'Listrik Dinamis & Rangkaian Arus Searah', subtitle: 'Hukum Ohm, hukum Kirchhoff I & II, hambatan seri paralel', summary: 'Aliran muatan listrik dalam konduktor, V = I * R, perhitungan daya listrik P = V * I, dan analisis loop rangkaian tertutup dengan hukum Kirchhoff.', tips: ['Hambatan seri dijumlah langsung Rs = R1 + R2', 'Hambatan paralel 1/Rp = 1/R1 + 1/R2', 'Hukum Kirchhoff I: Jumlah arus masuk = jumlah arus keluar simpul'] }
      ],
      []
    )
  },
  {
    id: 'sma-bahasa-inggris',
    educationLevel: 'SMA',
    name: 'Bahasa Inggris',
    slug: 'bahasa-inggris',
    category: 'Bahasa & Komunikasi',
    color: '#BFDFFF', // Sky
    iconName: 'BookOpen',
    description: 'Reading comprehension, tenses mastery, active-passive voice, and formal communication.',
    chapters: createEightChapters(
      'sma-bahasa-inggris',
      'Bahasa Inggris',
      [
        { title: 'Mastering English Tenses (Present & Past)', subtitle: 'Simple, Continuous, and Perfect tenses in authentic contexts', summary: 'A comprehensive study of English verb tenses, distinguishing habit, completed past events, and actions connecting past to present.', tips: ['Present Perfect (have + V3) indicates relevance to the current moment', 'Past Simple (V2) must be accompanied by specific past time signals like yesterday', 'Stative verbs (like, know, believe) are rarely used in continuous form'] },
        { title: 'Passive Voice & Causative Verbs', subtitle: 'Transforming active sentences to passive, have/get something done', summary: 'Learn how to emphasize the action or object rather than the doer: subject + be + past participle (V3) and causative structures.', tips: ['Always check the tense of the original active sentence when choosing "be"', 'The object of active sentence becomes the subject of passive sentence', 'Causative: have someone do something vs get someone to do something'] },
        { title: 'Conditional Sentences (Type 0, 1, 2, 3)', subtitle: 'Hypothetical situations, regrets, and real scientific facts', summary: 'Explore real possibilities, unreal present wishes (were instead of was), and unchangeable past regrets (had + V3, would have + V3).', tips: ['Type 1: If + present, will + V1 (real possibility in future)', 'Type 2: If + past simple, would + V1 (unreal present condition)', 'Type 3: If + past perfect, would have + V3 (past regret/unreal past)'] },
        { title: 'Relative Clauses & Participle Phrases', subtitle: 'Who, which, that, whose, and concise participle reductions', summary: 'Connecting ideas seamlessly using defining and non-defining relative clauses, as well as reducing clauses to present (-ing) or past (-ed) participles.', tips: ['Use "whose" to show possession of nouns', 'Non-defining clauses require commas and cannot use "that"', 'Participle phrases must share the same subject with the main clause'] },
        { title: 'Analytical & Hortatory Exposition Texts', subtitle: 'Persuasive essays, thesis statements, arguments, and recommendations', summary: 'Mastering the rhetorical structure of argumentative writing in English: introducing thesis, backing arguments with data, and reiterating or recommending action.', tips: ['Analytical ends with reiteration/summary', 'Hortatory ends with recommendation of what ought to be done', 'Use cohesive conjunctions: Furthermore, Consequently, In contrast'] },
        { title: 'Modals & Modals of Deduction', subtitle: 'Must, can\'t, might, should have, could have in expressing probability', summary: 'Expressing obligation, permission, and varying degrees of certainty about past and present events.', tips: ['Must have + V3: 95% certainty that something happened in the past', 'Can\'t have + V3: impossible that it happened in the past', 'Should have + V3: an obligation in the past that was not fulfilled'] },
        { title: 'Report & Discussion Texts', subtitle: 'Objective scientific descriptions and balanced viewpoints on issues', summary: 'Analyzing objective phenomena using generalized subjects and simple present tense, as well as contrasting pro and contra arguments.', tips: ['Report text deals with general classes, not specific instances', 'Discussion text presents both pros and cons before concluding', 'Maintain an academic, objective tone'] },
        { title: 'Formal Letters, Resumes & Academic Email', subtitle: 'Professional correspondence, etiquette, and job applications', summary: 'Writing structured cover letters, professional salutations, concise CV bullet points, and appropriate sign-offs in global educational settings.', tips: ['Salutation to known recipient: Dear Mr./Ms. [Name] with Yours sincerely', 'Unknown recipient: Dear Sir/Madam with Yours faithfully', 'Keep sentences clear, direct, and free from informal slang'] }
      ],
      []
    )
  },
  {
    id: 'sma-biologi',
    educationLevel: 'SMA',
    name: 'Biologi',
    slug: 'biologi',
    category: 'Sains Alam',
    color: '#BFEBD7', // Mint
    iconName: 'Dna',
    description: 'Eksplorasi sel, genetika, metabolisme, sistem organ manusia, dan evolusi kehidupan.',
    chapters: createEightChapters(
      'sma-biologi',
      'Biologi',
      [
        { title: 'Biologi Sel & Organel', subtitle: 'Struktur membran, mitokondria, ribosom, dan transport membran', summary: 'Unit terkecil kehidupan, perbedaan sel prokariotik dan eukariotik, difusi osmosis, endositosis, dan eksositosis.', tips: ['Mitokondria adalah pusat respirasi sel dan pembentukan ATP', 'Dinding sel selulosa hanya dimiliki oleh tumbuhan', 'Osmosis adalah perpindahan pelarut air melalui membran selektif permeabel'] },
        { title: 'Enzim & Metabolisme Sel', subtitle: 'Katabolisme (respirasi aerob & anaerob) serta anabolisme (fotosintesis)', summary: 'Sifat kerja enzim kunci-gembok dan induksi-pas, glikolisis, siklus Krebs, fosforilasi oksidatif, serta reaksi terang dan gelap fotosintesis.', tips: ['Enzim bersifat spesifik dan dapat terdenaturasi oleh panas ekstrem', 'Respirasi aerob menghasilkan total sekitar 36-38 ATP per molekul glukosa', 'Reaksi gelap (siklus Calvin) terjadi di stroma kloroplas'] },
        { title: 'Genetika & Pewarisan Sifat Mendel', subtitle: 'Hukum segregasi, asortasi bebas, persilangan monohibrid dan dihibrid', summary: 'Materi genetik DNA/RNA, proses transkripsi translasi sintesis protein, rasio fenotip monohibrid 3:1 dan dihibrid 9:3:3:1.', tips: ['Genotipe adalah susunan genetik, fenotipe adalah sifat tampak', 'Basa nitrogen DNA: Adenin berpasangan dengan Timin, Guanin dengan Sitosin', 'Pada RNA, Timin digantikan oleh Urasil'] },
        { title: 'Pembelahan Sel (Mitosis & Meiosis)', subtitle: 'Siklus sel, interfase, profase, metafase, anafase, telofase', summary: 'Pembelahan mitosis untuk pertumbuhan dan regenerasi sel tubuh (diploid 2n), serta meiosis untuk pembentukan gamet (haploid n).', tips: ['Crossing over (pindah silang) terjadi pada profase I meiosis', 'Metafase ditandai dengan kromosom berjejer di bidang ekuator', 'Mitosis menghasilkan 2 sel anakan identik; Meiosis menghasilkan 4 sel anakan rekombinan'] },
        { title: 'Sistem Sirkulasi & Peredaran Darah', subtitle: 'Jantung, pembuluh darah, komponen darah, dan golongan darah ABO', summary: 'Mekanisme pompa jantung bilik-serambi, peredaran darah ganda tertutup, sistem pembekuan darah oleh trombosit dan fibrinogen.', tips: ['Golongan darah O adalah donor universal sel darah merah', 'Golongan darah AB adalah resipien universal plasma', 'Vena pulmonalis membawa darah kaya oksigen dari paru-paru ke serambi kiri'] },
        { title: 'Sistem Saraf & Koordinasi Hormon', subtitle: 'Neuron, sinapsis, neurotransmiter, dan kelenjar endokrin', summary: 'Mekanisme penghantaran impuls sepanjang akson, potensial aksi saraf, gerak refleks, serta regulasi hormon insulin, glukagon, dan adrenalin.', tips: ['Arah impuls: dendrit → badan sel → akson → sinapsis', 'Refleks melewati sumsum tulang belakang tanpa menunggu proses sadar di otak besar', 'Hormon insulin menurunkan kadar gula darah'] },
        { title: 'Sistem Imun & Kekebalan Tubuh', subtitle: 'Imunitas non-spesifik, limfosit B & T, antibodi, dan vaksinasi', summary: 'Lapisan pertahanan tubuh: barier fisik kulit, fagosit, respons inflamasi, memori imunologi seluler, dan mekanisme kerja vaksin.', tips: ['Limfosit B memproduksi antibodi spesifik', 'Limfosit T sitotoksik menghancurkan sel yang terinfeksi virus atau tumor', 'Vaksin melatih memori imun tanpa menimbulkan keparahan penyakit'] },
        { title: 'Evolusi & Bioteknologi Modern', subtitle: 'Seleksi alam Darwin, DNA rekombinan, kultur jaringan, dan CRISPR', summary: 'Bukti evolusi homologi analogi, mutasi genetik acak, serta aplikasi rekayasa genetik seperti pembuatan insulin rekombinan.', tips: ['Struktur homolog memiliki asal embriologis sama namun fungsi dapat berbeda', 'Enzim restriksi endonuklease berfungsi memotong DNA pada situs target spesifik', 'Bioteknologi modern memanfaatkan rekayasa genetika tingkat molekuler'] }
      ],
      []
    )
  },
  {
    id: 'sma-kimia',
    educationLevel: 'SMA',
    name: 'Kimia',
    slug: 'kimia',
    category: 'Sains Alam',
    color: '#FFB86B', // Soft orange
    iconName: 'FlaskConical',
    description: 'Struktur atom, tabel periodik, ikatan kimia, stoikiometri, larutan asam basa, dan elektrokimia.',
    chapters: createEightChapters(
      'sma-kimia',
      'Kimia',
      [
        { title: 'Struktur Atom & Tabel Periodik', subtitle: 'Konfigurasi elektron mekanika kuantum, nomor massa, jari-jari atom', summary: 'Memahami model atom Bohr dan mekanika kuantum, bilangan kuantum n, l, m, s, serta tren keelektronegatifan dan energi ionisasi.', tips: ['Asas Aufbau: pengisian elektron dari tingkat energi terendah', 'Jari-jari atom membesar dari atas ke bawah dalam satu golongan', 'Elektronegativitas membesar dari kiri ke kanan dalam satu periode'] },
        { title: 'Ikatan Kimia & Bentuk Molekul', subtitle: 'Ikatan ion, kovalen polar-nonpolar, ikatan logam, dan teori VSEPR', summary: 'Pembentukan ikatan kimia untuk mencapai konfigurasi oktet stabil, gaya antarmolekul London dan ikatan hidrogen.', tips: ['Ikatan ion terjadi antara logam (donor elektron) dan non-logam (akseptor)', 'Ikatan hidrogen terjadi antara H dengan F, O, atau N', 'Bentuk molekul ditentukan oleh pasangan elektron ikatan (PEI) dan bebas (PEB)'] },
        { title: 'Stoikiometri & Konsep Mol', subtitle: 'Massa molar, volume molar gas ideal, hukum dasar kimia Lavoisier', summary: 'Perhitungan kimia kuantitatif: mol = massa / Mr, jumlah partikel = mol * 6.02x10²³, volume gas STP = mol * 22.4 L, dan pereaksi pembatas.', tips: ['Selalu setarakan persamaan reaksi kimia sebelum menghitung mol', 'Pereaksi pembatas adalah reaktan dengan hasil bagi mol/koefisien terkecil', 'Hukum kekekalan massa Lavoisier: massa sebelum = massa sesudah reaksi'] },
        { title: 'Termokimia & Entalpi Reaksi', subtitle: 'Reaksi eksoterm endoterm, kalorimeter, hukum Hess, energi ikatan', summary: 'Perubahan entalpi ΔH reaksi, penentuan ΔH melalui hukum Hess, entalpi pembentukan standar (ΔHf°), dan diagram energi tingkat keadaan.', tips: ['Reaksi eksoterm melepaskan kalor ke lingkungan (ΔH negatif)', 'Reaksi endoterm menyerap kalor dari lingkungan (ΔH positif)', 'Hukum Hess: ΔH reaksi hanya bergantung pada keadaan awal dan akhir'] },
        { title: 'Laju Reaksi & Kesetimbangan Kimia', subtitle: 'Teori tumbukan, faktor suhu/katalis, hukum aksi massa Le Chatelier', summary: 'Faktor yang mempengaruhi laju reaksi, orde reaksi, tetapan kesetimbangan Kc dan Kp, serta pergeseran kesetimbangan menurut asas Le Chatelier.', tips: ['Katalis mempercepat reaksi dengan menurunkan energi aktivasi Ea', 'Jika tekanan diperbesar, kesetimbangan bergeser ke koefisien gas terkecil', 'Zat berwujud padat murni (solid) tidak dimasukkan dalam rumus Kc'] },
        { title: 'Larutan Asam Basa & Titrasi', subtitle: 'Teori Arrhenius Bronsted-Lowry, perhitungan pH, indikator asam-basa', summary: 'Konsep asam kuat/lemah, basa kuat/lemah, rumus pH = -log[H+], larutan penyangga (buffer), hidrolisis garam, dan kurva titrasi netralisasi.', tips: ['Asam kuat: [H+] = M * valensi asam', 'Larutan penyangga mempertahankan pH jika ditambah sedikit asam/basa', 'Campuran asam lemah dan garam basa konjugasinya membentuk buffer asam'] },
        { title: 'Redoks & Sel Elektrokimia', subtitle: 'Penyetaraan reaksi redoks, sel Volta (baterai), dan sel elektrolisis', summary: 'Bilangan oksidasi, deret Volta potensial reduksi standar E°, perhitungan E°sel = E°katoda - E°anoda, dan hukum Faraday pengendapan logam.', tips: ['Oksidasi adalah kenaikan biloks (pelepasan elektron) di anoda', 'Reduksi adalah penurunan biloks (penangkapan elektron) di katoda', 'E°sel positif menandakan reaksi berlangsung spontan'] },
        { title: 'Kimia Karbon & Polimer Organik', subtitle: 'Gugus fungsi alkohol, eter, aldehid, keton, asam karboksilat, ester', summary: 'Tata nama IUPAC senyawa organik, isomerisme, reaksi esterifikasi, karbohidrat, protein, lemak, dan polimer sintetis.', tips: ['Alkohol berakhiran -ol (-OH), Asam karboksilat berakhiran -oat (-COOH)', 'Reaksi asam karboksilat + alkohol menghasilkan ester yang beraroma harum', 'Polimerisasi adisi memutus ikatan rangkap alkena'] }
      ],
      []
    )
  }
];

// Helper to provide curriculum subjects for any level
export function getSubjectsByLevel(level: EducationLevelId): Subject[] {
  if (level === 'SMA') return SMA_SUBJECTS;

  // Generate customized subjects for other levels, each strictly having 8 chapters
  const levelTemplates: Record<Exclude<EducationLevelId, 'SMA'>, { name: string; slug: string; category: string; color: string; icon: string; desc: string }[]> = {
    SD: [
      { name: 'Matematika SD', slug: 'matematika-sd', category: 'Hitung Dasar', color: '#E9D9FF', icon: 'Calculator', desc: 'Penjumlahan, perkalian, pecahan, geometri bangun datar, dan soal cerita terapan.' },
      { name: 'Ilmu Pengetahuan Alam', slug: 'ipa-sd', category: 'Sains Anak', color: '#BFEBD7', icon: 'TreePine', desc: 'Makhluk hidup, ekosistem hewan tumbuhan, gaya gerak, dan magnet.' },
      { name: 'Bahasa Indonesia', slug: 'b-indonesia-sd', category: 'Bahasa', color: '#FFD1C1', icon: 'BookOpen', desc: 'Membaca nyaring, kosa kata, puisi anak, dan membuat paragraf terstruktur.' },
      { name: 'Ilmu Pengetahuan Sosial', slug: 'ips-sd', category: 'Sosial Budaya', color: '#BFDFFF', icon: 'Globe', desc: 'Keragaman budaya Nusantara, sejarah pahlawan, dan peta kepulauan Indonesia.' },
      { name: 'Pendidikan Pancasila', slug: 'pancasila-sd', category: 'Karakter', color: '#FFB86B', icon: 'ShieldCheck', desc: 'Nilai-nilai luhur Pancasila, toleransi, gotong royong, dan hak kewajiban warga.' }
    ],
    SMP: [
      { name: 'Matematika SMP', slug: 'matematika-smp', category: 'Eksakta', color: '#E9D9FF', icon: 'Calculator', desc: 'Himpunan, aljabar, phytagoras, statistika data, peluang, dan bangun ruang.' },
      { name: 'IPA Terpadu', slug: 'ipa-smp', category: 'Sains Terpadu', color: '#BFEBD7', icon: 'FlaskConical', desc: 'Zat dan perubahannya, sistem organ manusia, optik cermin lensa, dan listrik statis.' },
      { name: 'Bahasa Inggris SMP', slug: 'b-inggris-smp', category: 'Bahasa', color: '#BFDFFF', icon: 'BookOpen', desc: 'Descriptive text, recount text, narrative legends, and daily conversation dialogue.' },
      { name: 'IPS Terpadu', slug: 'ips-smp', category: 'Sosial', color: '#FFD1C1', icon: 'Globe', desc: 'Letak geografis Indonesia, interaksi antarruang ASEAN, dan permintaan penawaran pasar.' },
      { name: 'Informatika SMP', slug: 'informatika-smp', category: 'Teknologi', color: '#FFB86B', icon: 'Laptop', desc: 'Berpikir komputasional, algoritma blok, keamanan digital, dan etika berinternet.' }
    ],
    SMK: [
      { name: 'Pemrograman Dasar', slug: 'pemrograman-dasar', category: 'Teknologi Informasi', color: '#E9D9FF', icon: 'Code', desc: 'Logika percabangan, perulangan, array, fungsi modular, dan debugging kode program.' },
      { name: 'Sistem Komputer', slug: 'sistem-komputer', category: 'Hardware & OS', color: '#BFDFFF', icon: 'Cpu', desc: 'Gerbang logika biner, arsitektur CPU register, memori RAM ROM, dan instalasi sistem.' },
      { name: 'Matematika Terapan', slug: 'matematika-terapan', category: 'Terapan', color: '#FFD1C1', icon: 'Calculator', desc: 'Statistika industri, peluang kendali mutu, trigonometri sudut konstruksi teknis.' },
      { name: 'Desain Grafis Komunikasi', slug: 'desain-grafis', category: 'Kreatif', color: '#F6B6D8', icon: 'Palette', desc: 'Prinsip tata letak komposisi, tipografi digital, format vektor raster, dan UI layout.' },
      { name: 'Bahasa Inggris Kejuruan', slug: 'b-inggris-smk', category: 'Kejuruan', color: '#BFEBD7', icon: 'BookOpen', desc: 'Technical manual reading, customer service dialogues, and international project pitch.' }
    ],
    KULIAH: [
      { name: 'Kalkulus & Aljabar Linier', slug: 'kalkulus-kuliah', category: 'Matematika Tinggi', color: '#E9D9FF', icon: 'Calculator', desc: 'Vektor ruang n, matriks ortogonal, eigen value, turunan parsial multivariabel.' },
      { name: 'Algoritma & Struktur Data', slug: 'struktur-data', category: 'Computer Science', color: '#BFDFFF', icon: 'Binary', desc: 'Kompleksitas Big O, linked list, balanced binary trees, graph traversal BFS/DFS.' },
      { name: 'Basis Data & SQL Modern', slug: 'basis-data', category: 'Sistem Informasi', color: '#BFEBD7', icon: 'Database', desc: 'Normalisasi 1NF-BCNF, relasi ACID, query JOIN subquery, dan indexing performa.' },
      { name: 'Statistika & Probabilitas', slug: 'statistika-kuliah', category: 'Analisis Data', color: '#FFD1C1', icon: 'BarChart3', desc: 'Distribusi normal, uji hipotesis t-test ANOVA, regresi linear, dan estimasi interval.' },
      { name: 'Rekayasa Perangkat Lunak', slug: 'rpl-kuliah', category: 'Software Engineering', color: '#FFB86B', icon: 'Layers', desc: 'Metodologi Agile Scrum, Clean Architecture, unit testing CI/CD, dan desain sistem.' }
    ]
  };

  const templates = levelTemplates[level] || levelTemplates.SMP;

  return templates.map(t => ({
    id: `${level.toLowerCase()}-${t.slug}`,
    educationLevel: level,
    name: t.name,
    slug: t.slug,
    category: t.category,
    color: t.color,
    iconName: t.icon,
    description: t.desc,
    chapters: createEightChapters(
      `${level.toLowerCase()}-${t.slug}`,
      t.name,
      [
        { title: `BAB 1: Pengantar & Fondasi Utama ${t.name}`, subtitle: 'Pemahaman konsep dasar dan ruang lingkup', summary: `Mempelajari fondasi teoritis dan praktis yang melandasi seluruh studi ${t.name}.`, tips: ['Kuasai istilah terminologi dasar', 'Pahami alur proses sebelum menghafal', 'Buat catatan ringkas di setiap akhir sesi'] },
        { title: `BAB 2: Teori Fundamental & Analisis Sistem`, subtitle: 'Studi mendalam mengenai variabel dan karakteristik', summary: `Menelaah variabel inti yang bekerja pada sistem ${t.name} beserta relasi matematis dan logisnya.`, tips: ['Petakan hubungan sebab akibat', 'Perhatikan kondisi batas yang berlaku', 'Gunakan contoh riil untuk memvisualisasikan'] },
        { title: `BAB 3: Penerapan Praktis & Pemecahan Kasus`, subtitle: 'Implementasi konsep pada permasalahan nyata', summary: `Menerapkan kaidah ${t.name} untuk menyelesaikan skenario masalah di dunia industri dan akademik.`, tips: ['Uraikan masalah kompleks menjadi sub-masalah kecil', 'Pilih formula atau algoritma yang paling sesuai', 'Lakukan uji validasi'] },
        { title: `BAB 4: Eksplorasi Lanjutan & Model Dinamis`, subtitle: 'Pola interaksi dan pengujian parameter', summary: `Menganalisis sistem dinamis dengan parameter majemuk untuk memahami perilaku keseluruhan.`, tips: ['Bandingkan beberapa alternatif solusi', 'Perhatikan efisiensi langkah kerja', 'Identifikasi titik rawan kesalahan'] },
        { title: `BAB 5: Standarisasi & Optimasi Metode`, subtitle: 'Metode pengoptimalan hasil dan efisiensi', summary: `Meningkatkan akurasi dan kinerja melalui optimasi terstruktur dan benchmarking data.`, tips: ['Fokus pada minimalisasi eror', 'Pelajari standar baku internasional', 'Gunakan metrik terukur untuk evaluasi'] },
        { title: `BAB 6: Integrasi Antardisiplin & Studi Lapangan`, subtitle: 'Koneksi materi dengan disiplin ilmu lainnya', summary: `Melihat bagaimana materi ini bersinergi dengan bidang sains, teknik, dan sosial lain.`, tips: ['Gunakan pendekatan multi-sudut pandang', 'Terapkan konsep secara kontekstual', 'Tinjau dampak jangka panjang'] },
        { title: `BAB 7: Inovasi Terkini & Tren Riset Modern`, subtitle: 'Perkembangan riset teranyar dan teknologi pendukung', summary: `Membahas inovasi mutakhir dan riset ilmiah terbaru yang memperkaya cakrawala materi.`, tips: ['Tetap kritis terhadap keabsahan sumber', 'Amati arah perkembangan teknologi masa depan', 'Diskusikan studi kasus terkini'] },
        { title: `BAB 8: Evaluasi Komprehensif & Uji Kapasitas`, subtitle: 'Sintesis akhir, proyek mandiri, dan penguasaan puncak', summary: `Puncak pembelajaran yang menyatukan seluruh 8 bab menjadi pemahaman holistik siap terap.`, tips: ['Ulangi review bab 1 sampai 7', 'Latihan soal dengan batas waktu terkontrol', 'Siapkan diri untuk mencapai skor di atas 80%'] }
      ],
      []
    )
  }));
}

// Initial flashcard decks
export const INITIAL_FLASHCARDS = [
  {
    id: 'fc-1',
    subjectId: 'sma-matematika',
    subjectName: 'Matematika',
    front: 'Apa definisi dan syarat dari matriks non-singular?',
    back: 'Matriks persegi yang memiliki nilai determinan tidak sama dengan nol (det(A) ≠ 0), sehingga memiliki invers A⁻¹.',
    hint: 'Berkaitan dengan nilai determinan.',
    status: 'learning' as const
  },
  {
    id: 'fc-2',
    subjectId: 'sma-matematika',
    subjectName: 'Matematika',
    front: 'Rumus suku ke-n (Un) pada barisan aritmetika adalah...',
    back: 'Un = a + (n - 1)b\nDi mana a = suku pertama, b = beda antar suku.',
    hint: 'Dimulai dari suku awal a.',
    status: 'mastered' as const
  },
  {
    id: 'fc-3',
    subjectId: 'sma-fisika',
    subjectName: 'Fisika',
    front: 'Tuliskan Hukum II Newton dalam bentuk persamaan!',
    back: 'ΣF = m * a\nResultan gaya sama dengan perkalian massa dengan percepatan gerak benda.',
    hint: 'Gaya = massa dikali...',
    status: 'learning' as const
  },
  {
    id: 'fc-4',
    subjectId: 'sma-fisika',
    subjectName: 'Fisika',
    front: 'Kapan energi mekanik suatu sistem terisolasi bernilai kekal?',
    back: 'Ketika hanya gaya-gaya konservatif (seperti gravitasi dan pegas) yang bekerja, tanpa adanya gaya dissipatif seperti gesekan.',
    hint: 'Ketiadaan gaya non-konservatif.',
    status: 'new' as const
  },
  {
    id: 'fc-5',
    subjectId: 'sma-biologi',
    subjectName: 'Biologi',
    front: 'Di organel sel manakah respirasi seluler aerob berlangsung?',
    back: 'Mitokondria (terutama pada matriks dan krista membran dalam).',
    hint: 'The powerhouse of the cell.',
    status: 'mastered' as const
  },
  {
    id: 'fc-6',
    subjectId: 'sma-bahasa-inggris',
    subjectName: 'Bahasa Inggris',
    front: 'Formulasikan pola Conditional Sentence Type 2 (unreal present)!',
    back: 'If + Simple Past (V2 / were), S + would / could + V1\nContoh: If I were a bird, I would fly to you.',
    hint: 'Menggunakan past tense di klausa if dan would di klausa utama.',
    status: 'learning' as const
  }
];
