import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  let requestData;
  try {
    requestData = await request.json();
  } catch (error) {
    console.error("JSON parsing error:", error);
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  try {
    const { transactions, stakingData } = requestData;

    if (!Array.isArray(transactions) || !Array.isArray(stakingData)) {
      return NextResponse.json(
        { error: "transactions and stakingData must be arrays" },
        { status: 400 }
      );
    }

    if (transactions.length === 0 || stakingData.length === 0) {
      return NextResponse.json(
        { error: "transactions and stakingData arrays cannot be empty" },
        { status: 400 }
      );
    }

    const prompt = `Analyze the following Celestia blockchain transactions and provide investment insights that are less than 500 tokens in length:

    High-Value Transactions:
    ${JSON.stringify(transactions, null, 2)}

    Staking Activity:
    ${JSON.stringify(stakingData, null, 2)}

    Additional Context:
    - **Celestia Overview:** Celestia is a modular data availability network that securely scales with the number of users, making it easy for anyone to launch their own blockchain.
    - **Staking Growth:** In 2024, Celestia experienced a 49.5% increase in total TIA staked, rising from 470 million to 703 million TIA, achieving one of the highest staking ratios among all Cosmos chains.
    - **Data Availability Sampling:** Celestia utilizes data availability sampling, where nodes verify a random sample of transactions instead of the entire blockchain history, leading to faster transaction speeds.
    - **Recent Price Movement:** Celestia's token, TIA, recently posted an 18% gain, trading at $3.77, attracting investor attention.

    Provide an analysis of market trends based on the transactions provided and showcase any potential investment opportunities based on the above information if any exist.

    Make sure to include the following in the report:
    - Market trends and sentiment to sustain your assessment
    - Potential investment opportunities within the Celestia ecosystem, especially based on the transactions reviewed
    - Risks and challenges that may impact the TIA token price
    - Insights for investors based on the transactions reviewed - i.e. what are some top movers in the Celestia ecosystem that they should look at? What are whales investing in?

    Please replace bullet points with emojis accurate to that meaning. Each sentence sustaining the reasoning should being with an appropriate emoji in the report more engaging and bring in as many diverse data points as you possibly can.

    The report should be in markdown format and should analyze market data trends to understand the market sentiment and potential investment opportunities for the TIA token. It should be concise and to the point and clearly formatted. The title of the insights should be an h2 markdown of the assessment of TIA.
    For example a title could be: "Analysis: Roll-ups are the future of Celestia" or "Analysis: Increase in activity from DeFi automated services in the last 24 hours"

    Especially when using a specific data point from the transactions fetched, it should share the hash and link of the transaction it used to make that recommendation as evidence.

    Here is an example of a well-written report:
    ## Market sentiment: positive

    ### Summary
    Based on the recent transaction and staking data, along with the positive market trends for the Celestia ecosystem, our recommendation for investors is to **buy TIA** tokens soon, as it shows significant growth potential with no signs of decreasing. Additionally, there are some projects in the Celestia ecosystem that are showing strong potential and could be good investments upon token launch, like Privy.

    ### Market Trends and Sentiment
    📊 **Recent Price Movement:** The TIA token has seen a recent 18% price gain, now trading at $3.77. This upward trend reflects increased interest from investors, likely due to newfound utility and momentum in the ecosystem.
    💪 **Staking Growth:** Celestia's 49.5% increase in total TIA staked (from 470 million to 703 million TIA) signals a strong commitment from investors, showcasing confidence in the project's long-term prospects. The high staking ratio among Cosmos chains supports this robust investment climate.
    ⚡ **Transaction Volume and Activities:** The high-value transactions, particularly multiple MsgPayForBlobs activities with consistent fees and successful executions, indicate a thriving economic environment within the Celestia network.

    ### Noteworthy Transactions
    Transaction from celestia1c37c0qu4g9rh7ng9sqptn335aaqvluzc59kcym with a gas used of 1,320,644 and a fee of 2,946.
    [View Transaction](https://mocha-4.celenium.io/address/celestia1c37c0qu4g9rh7ng9sqptn335aaqvluzc59kcym?tab=transactions). The address is extremely active, with multiple transactions occurring within seconds or minutes of each other. The address shows a very regular pattern of transactions, suggesting this is likely an automated service or application rather than a regular user wallet.

    ### Potential Investment Opportunities
    📈 **Expansion of Cava Ecosystem:** As Celestia grows, new projects may emerge within the ecosystem, providing early-stage investment opportunities in promising applications leveraging its infrastructure. Investors can benefit from participating in newly launched DApps or staking pools.
    🎯 **Governance Participation:** With increased staking, holders can participate in governance decisions, allowing them to shape the ecosystem and possibly influence the value of their investments.
    📊 **Active Development:** The ongoing improvements in transactional efficiency through data availability sampling positions Celestia favorably against competitors, making it an attractive long-term hold.

    ### Risks and Challenges
    📉 **Market Volatility:** Despite the current growth, the cryptocurrency market remains highly volatile. Investors should be wary of price fluctuations that could lead to sudden losses.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 1000
    });

    return NextResponse.json({
      insights: response.choices[0].message.content || "No insights available",
    });
  } catch (error) {
    console.error("Error generating insights:", error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: "OpenAI API error", details: error.message },
        { status: 502 }
      );
    } else if (error instanceof TypeError) {
      return NextResponse.json(
        { error: "Type error when processing data", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to generate insights", details: error instanceof Error ? error.message : "Unknown error" },
        { status: 500 }
      );
    }
  }
}
