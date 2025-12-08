import { PageContainer } from "@ant-design/pro-components"
import CodeJava from '@/utils/CodePre/CodeJava'
import { Typography } from "antd"
const { Title, Paragraph } = Typography

const PageAPI = () => {
  return (
    <PageContainer>
      <Typography>
        <Paragraph>
          Spring Boot 專案開發時，常需要進行 <code>資料複製</code> <br/>
          如： <br/>
          將 <code>clntEntity</code> 的資料 複製到 <code>clntVo</code> 中。 <br/>
          此時，可以透過 <code>BeanUtils.copyProperties()</code> 進行處理。 <br/>
          會自動將 <code>相同屬性</code> 且 <code>相同名稱</code> 的欄位進行數據複製。
        </Paragraph>
        <CodeJava code={`BeanUtils.copyProperties(目標物件, 來源物件);`} />

        <details>
          <summary style={{ fontSize: '1.5em', fontWeight: 'bold' }}>範例</summary>
          <CodeJava code={`@Service
public class ClntService {
    @Autowired
    private ClntRepository clntRepository;

    /**
     * 取得 客戶基本資料
     * @param clientId 客戶證號
     * @return
     */
    public ClntVo getClnt(String clientId) {
        Optional<ClntEntity> clntOptional = clntRepository.findById(clientId);
        if (clntOptional.isPresent()) {
            ClntEntity clntEntity = clntOptional.get();

            ClntVo clntVo = new ClntVo();
            BeanUtils.copyProperties(clntEntity, clntVo);
            clntVo.setSex(clntEntity.getSex() + " " + SexEnum.getDescByCode(clntEntity.getSex()));
            return clntVo;
        }
        return null;
    }
}`} />
      </details>
      </Typography>
    </PageContainer >
  )
}

export default PageAPI