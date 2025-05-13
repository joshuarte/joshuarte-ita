import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ottieni il percorso corrente in formato ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Percorso dell'immagine originale e delle versioni generate
const sourceImage = path.resolve(__dirname, 'public/images/bg.jpg');
const outputDir = path.resolve(__dirname, 'dist/images/');
const webpOutput = path.join(outputDir, 'bg.webp');
const avifOutput = path.join(outputDir, 'bg.avif');
const jpgOutput = path.join(outputDir, 'bg.jpg');

// Assicurati che la directory di output esista
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeBackgroundImage() {
  try {
    // Dimensione originale dell'immagine
    const originalSize = fs.statSync(sourceImage).size;
    console.log(`Dimensione originale: ${Math.round(originalSize / 1024)} KB`);

    // Ottimizza e ridimensiona l'immagine JPG
    const optimizedBuffer = await sharp(sourceImage)
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ 
        quality: 75,
        progressive: true,
        mozjpeg: true
      })
      .toBuffer();
    
    // Salva l'immagine JPG ottimizzata
    await fs.promises.writeFile(jpgOutput, optimizedBuffer);
    const jpgSize = fs.statSync(jpgOutput).size;
    console.log(`JPG ottimizzato: ${Math.round(jpgSize / 1024)} KB (risparmio: ${Math.round((originalSize - jpgSize) / 1024)} KB)`);
    
    // Crea versione WebP
    await sharp(optimizedBuffer)
      .webp({ quality: 70, effort: 6 })
      .toFile(webpOutput);
    const webpSize = fs.statSync(webpOutput).size;
    console.log(`WebP generato: ${Math.round(webpSize / 1024)} KB (risparmio: ${Math.round((originalSize - webpSize) / 1024)} KB)`);
    
    // Crea versione AVIF
    await sharp(optimizedBuffer)
      .avif({ quality: 60, effort: 9 })
      .toFile(avifOutput);
    const avifSize = fs.statSync(avifOutput).size;
    console.log(`AVIF generato: ${Math.round(avifSize / 1024)} KB (risparmio: ${Math.round((originalSize - avifSize) / 1024)} KB)`);
    
    console.log('Ottimizzazione completata!');
  } catch (error) {
    console.error('Errore durante l\'ottimizzazione dell\'immagine:', error);
  }
}

optimizeBackgroundImage(); 