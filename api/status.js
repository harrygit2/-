export default async function handler(req, res) {
  // 환경변수에서 토큰을 가져옵니다. (나중에 Vercel 설정에서 등록할 값)
  const PAT = process.env.AIRTABLE_TOKEN; 
  const BASE_ID = 'appfxdcwmVcUd6uGm';
  const TABLE_NAME = 'Status';

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${PAT}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    const fields = data.records[0].fields;

    // 프론트엔드로 필요한 데이터만 정제해서 보냅니다.
    res.status(200).json({
      male: fields.Male_count || 0,
      female: fields.Female_count || 0
    });
  } catch (error) {
    res.status(500).json({ error: '데이터를 가져오는데 실패했습니다.' });
  }
}