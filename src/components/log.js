import React from "react"
import { DateTime } from "luxon"

export default ({ log }) => (
  <tr>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="text-sm leading-5 font-medium text-gray-900">
        {DateTime.fromMillis(log.timestamp).toLocaleString(
          DateTime.DATETIME_SHORT
        )}
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="text-sm leading-5 text-gray-900">
        {log.metadata ? log.metadata.country : ""}
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div class="text-xs leading-5 text-gray-900">{log.wallet}</div>
    </td>
  </tr>
)
