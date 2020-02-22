import { ExamScanResult } from './exam-scan-result';
export class Scanner {
    matchTemplate(exam: File, template: File) : ExamScanResult {
        return new ExamScanResult([]);
      }
    
    mat() : any {
      return new cv.Mat(5,5,cv.CV_32FC1);
    }

      matchTemplate2(imagEElement: any, imgTElement: any) : any {
        let templ = cv.imread(imgTElement);
        let src = cv.imread(imagEElement);

        let mask = new cv.Mat();
        let dst = new cv.Mat(src.cols-templ.cols+1, src.rows-templ.rows+1,cv.CV_32FC1);

        let ansMap = new Map();
        // using NORMED in matching methos is the least designated to find erronous match
        cv.matchTemplate(src, templ, dst, cv.TM_CCOEFF_NORMED, mask);

        // extract highest matching of the given template
        while(true){
          let result = cv.minMaxLoc(dst, mask);
          let maxPoint = result.maxLoc;
          let threshold = result.maxVal;
          let redColor = new cv.Scalar(255, 0, 0, 255);
          let blackColor = new cv.Scalar(0, 0, 0, 0);

          // threshold was determined empirically
          if(threshold >=0.67)
          {
            let diagonal_point = new cv.Point(maxPoint.x + templ.cols, maxPoint.y + templ.rows);
            let rect = new cv.Rect(maxPoint.x, maxPoint.y, templ.cols, templ.rows);
            let currAns = src.roi(rect);
            let chunkedImages = this.splitImage(currAns, 5);
            let marked = this.markedAnswer(chunkedImages);
            ansMap.set(maxPoint, marked);
            // draw rectangle around the found template in the output picture
            cv.rectangle(src, maxPoint, diagonal_point, redColor, 2, cv.LINE_8, 0);
            // erase this matching in order to find next matching
            cv.rectangle(dst, maxPoint, diagonal_point, blackColor, -1, cv.LINE_8, 0);
        }
          else
          {
              break; //No more results within tolerance, break search
          }
        }

        var sortedMap = new Map([...ansMap.entries()].sort(this.sortKeys));
        return src;
      }
      // a[0], b[0] are points (keys of ansMap)
      sortKeys(a,b){
        return sortPoints(a[0], b[0]);
      }
      

      // find out which answer was marked by determining which sub-image in imagesArr
      // has the bigget number of colored pixeles 
      markedAnswer(imagesArr){
        let maxBlack = 0;
        let maxImg = 0;
        for(let i = 0; i < imagesArr.length; i++){
            let currAns = imagesArr[i];
            //CONVERT IMAGE TO B&W AND DETERMINE IF IT HAS MORE BLACK OR WHITE
            cv.cvtColor(currAns, currAns, cv.COLOR_BGR2GRAY);
            let nonBlackPixels = cv.countNonZero(currAns);
            let blackPixels = currAns.rows * currAns.cols - nonBlackPixels;
            if(maxBlack < blackPixels){
                maxBlack = blackPixels;
                maxImg = i+1;
            }
        }

        return maxImg;
      }

      // split source image into chunksNum smaller images
      // split is done according to the image width
      splitImage(image, chunksNum) {
        let sizeOfPart = image.cols/chunksNum;
        let chunkedImages = [];
        for(let i = 0; i < chunksNum; i++){
            let ith_ans = new cv.Rect(i*sizeOfPart, 0, sizeOfPart, image.rows);
            let temp = image.roi(ith_ans);
            chunkedImages.push(temp);
        }
        return chunkedImages;
      }
}
// sort points:
// x value is the most significant
function sortPoints(a, b){
  if(a.x < b.x)
    return -1;
  if(a.x > b.x)
    return 1;
  if(a.x == b.x && a.y < b.y)
    return -1;
  if(a.x == b.x && a.y > b.y)
    return 1;
  return 0;

}
