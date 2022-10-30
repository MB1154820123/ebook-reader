package top.zymdb.eb.reader.util;
import java.io.*;

public class FileOperator {
    /**
     * 读取根目录为static下的文件
     * @param path
     * @return
     * @throws IOException
     */
    public String readFile(String path) throws IOException {
        path = java.net.URLDecoder.decode(path,"utf-8");
        String content = "";
        int position=0;
        String[] substring=new String[1024];
        //打开带读取的文件
        BufferedReader br = new BufferedReader(new FileReader(path));
        String line;
        while((line=br.readLine())!=null) {
            substring[position]=line;
            position++;
        }
        br.close();//关闭文件
        for(int i=0;i<position;i++) {
            content +=i<(position-1)?(substring[i]+"\n"):(substring[i]);
        }
        return content;
    }
    /**
     * 向根目录为static下的文件写入内容
     * @param content
     * @param path
     * @throws IOException
     */
    public void writeFile(String content,String path) throws IOException {
        path = java.net.URLDecoder.decode(path,"utf-8");
        OutputStream os = new FileOutputStream(path);
        PrintWriter pw=new PrintWriter(os);
        pw.print(content);
        pw.close();
        os.close();
    }


}
